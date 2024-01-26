import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Card, Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Modal} from 'antd';
import {chromeStorageSyncSet, getAllValues} from "../functions/file";

export const CardData = () => {
	let ref = new createRef();
	return (
		<Card title="数据" extra={<AddPopup />}>
			<DataTable/>
		</Card>
	)
}

const EditableCell = ({
	                      editing,
	                      dataIndex,
	                      title,
	                      inputType,
	                      record,
	                      index,
	                      children,
	                      ...restProps
                      }) => {
	const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item name={dataIndex}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};



const DataTable = forwardRef(({}, ref) => {
	useImperativeHandle(ref, () => ({
		handleSave: handleSave,
		AddButton: AddButton
	}))
	const AddButton = () => {
		return (
			<Button
				onClick={handleSave}
				type="primary"
				style={{
					marginBottom: 16,
				}}
			>
				Add a row
			</Button>
		)
	}
	const [data, setData] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const allData = await getAllValues();
			if (allData) {
				const data = []
				for (let i = 0; i < allData.length; i++) {
					data.push({
						key: i,
						abbr: allData[i][0],
						url: allData[i][1],
					});
				}
				setData(data)
			}
		}

		fetchData()
	}, [])

	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record) => record.key === editingKey;
	const edit = (record) => {
		form.setFieldsValue({
			name: '',
			age: '',
			address: '',
			...record,
		});
		setEditingKey(record.key);
	};
	const cancel = () => {
		setEditingKey('');
	};
	const handleSave = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				console.log("item", item)
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey('');
			}
			// 数据个数转换
			let saveData = []
			for (const newDatum of newData) {
				let saveArray = [newDatum.abbr, newDatum.url]
				saveData.push(saveArray)
			}
			chromeStorageSyncSet(saveData)
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};
	const handleDelete = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey('');
			}

		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};
	const columns = [
		{
			title: 'abbr(缩写)',
			dataIndex: 'abbr',
			editable: true,
		},
		{
			title: 'url(链接)',
			dataIndex: 'url',
			editable: true,
		},
		{
			title: 'operation',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
            <Typography.Link onClick={() => handleSave(record.key)} style={{marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              Cancel
            </Popconfirm>
          </span>
				) : (
					<span>
						<Typography.Link style={{marginRight: 8}} disabled={editingKey !== ''} onClick={() => edit(record)}>
							Edit
						</Typography.Link>
						<Typography.Link disabled={editingKey !== ''} onClick={() => handleDelete(record)}>
							Delete
						</Typography.Link>
					</span>
				);
			},
		},
	];
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'age' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	return (
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);
});


const AddPopup = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onFinish = (values) => {
		console.log('Success:', values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<>
			<Button type="primary" onClick={showModal} >
				新增
			</Button>
			<Modal title="新增" open={isModalOpen} cancelText={'取消'} okText={'新增'} onOk={handleOk} onCancel={handleCancel}>
				<Form
					name="basic"
					labelCol={{
						span: 4,
					}}
					wrapperCol={{
						span: 20,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Abbr"
						name="abbr"
						rules={[
							{
								required: true,
								message: 'Please input abbr',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Url"
						name="url"
						rules={[
							{
								required: true,
								message: '请输入url',
							},
						]}
					>
						<Input />
					</Form.Item>

					{/*<Form.Item*/}
					{/*	wrapperCol={{*/}
					{/*		offset: 16,*/}
					{/*		span: 16,*/}
					{/*	}}*/}
					{/*>*/}
					{/*	<Button htmlType="cancel">*/}
					{/*		取消*/}
					{/*	</Button>*/}

					{/*	<Button type="primary" htmlType="submit">*/}
					{/*		新增*/}
					{/*	</Button>*/}
					{/*</Form.Item>*/}
				</Form>
			</Modal>
		</>
	);
};