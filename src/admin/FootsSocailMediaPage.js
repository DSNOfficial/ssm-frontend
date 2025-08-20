import { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import {
  Table,
  Button,
  Space,
  Modal,
  Input,
  Form,
  Select,
  message,
  Tag,
  Col,
  Row,
} from "antd";
import MainPage from "../component/page/MainPage";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "../component/assets/css/TextEditor.css";

const FootsSocailMediaPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formCat] = Form.useForm();

  useEffect(() => {
    formCat.setFieldsValue({
      status: "1",
    });
    getList();
  }, []);

  const filterRef = useRef({
    txt_search: null,
    status: null,
  });

  const getList = async () => {
    setLoading(true);
    var param = {
      txt_search: filterRef.current.txt_search,
      status: filterRef.current.status,
    };
    const res = await request("footsocialmedia/getlist", "get", param);
    setLoading(false);
    if (res) {
      setList(res.list);
    }
  };

  const onClickBtnEdit = async (item) => {
    formCat.setFieldsValue({
      id: item.id,
      title1: item.title1,
      title2: item.title2,
      title3: item.title3,
      title4: item.title4,
      email: item.email,
      phone: item.phone,
      facebookLink: item.facebookLink,
      googleLink: item.googleLink,
      copyRight: item.copyRight,
      description: item.description,
      status: String(item.status),
    });
    setOpen(true);
  };

  const onClickBtnDelete = async (item) => {
    Modal.confirm({
      title: "Delete",
      content: "Are you sure you want to delete ?",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      centered: true,
      onOk: async () => {
        var data = {
          id: item.id,
        };
        const res = await request("footsocialmedia/delete", "delete", data);
        if (res) {
          message.success(res.message);
          getList();
        }
      },
    });
  };

  const onFinish = async (item) => {
    var id = formCat.getFieldValue("id");
    var data = {
      id: id,
      title1: item.title1,
      title2: item.title2,
      title3: item.title3,
      title4: item.title4,
      email: item.email,
      phone: item.phone,
      facebookLink: item.facebookLink,
      googleLink: item.googleLink,
      copyRight: item.copyRight,
      description: item.description,
      status: item.status,
    };
    var method = id == null ? "post" : "put";
    var url =
      id == null ? "footsocialmedia/create" : "footsocialmedia/update";
    const res = await request(url, method, data);
    if (res) {
      message.success(res.message);
      getList();
      onCloseModule();
    }
  };

  const onChangeSearch = (e) => {
    filterRef.current.txt_search = e.target.value;
    getList();
  };
  const onChangeStatus = (value) => {
    filterRef.current.status = value;
    getList();
  };

  const onCloseModule = () => {
    formCat.resetFields();
    formCat.setFieldsValue({
      status: "1",
    });
    setOpen(false);
  };

  const fontSize = {
    fontFamily: "KhmerOSSiemReap",
    width: "100%",
  };

  return (
    <MainPage loading={loading}>
      <div
        style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10 }}
      >
        <Space>
          <div className="txt_title">បណ្តាញសង្គម និងទីតាំង Google</div>
          <Input.Search
            allowClear
            onChange={onChangeSearch}
            placeholder="ស្វែងរក"
          />
        </Space>

        <Button onClick={() => setOpen(true)} type="primary">
          បន្ថែមថ្មី
        </Button>
      </div>
      <hr />
      <Table
        rowKey="id"
        dataSource={list}
        pagination={{ pageSize: 7 }}
        columns={[
          {
            key: "No",
            title: "ល.រ",
            align: "center",
            width: 60,
            render: (value, item, index) => index + 1,
          },
          {
            key: "title1",
            title: "ចំណង់ជើង ១",
            dataIndex: "title1",
          },
          {
            key: "title2",
            title: "ចំណង់ជើង ២",
            dataIndex: "title2",
          },
          {
            key: "email",
            title: "អ៊ីម៉ែល",
            dataIndex: "email",
          },
          {
            key: "phone",
            title: "ទូរស័ព្ទ",
            dataIndex: "phone",
          },
          {
            key: "status",
            title: "Active or Inactive",
            dataIndex: "status",
            render: (value) =>
              value === 1 ? (
                <Tag color="green">Actived</Tag>
              ) : (
                <Tag color="red">InActived</Tag>
              ),
          },
          {
            key: "Action",
            title: "កែប្រែ/លុប",
            render: (value, item) => (
              <Space>
                <Button onClick={() => onClickBtnEdit(item)}>កែប្រែ</Button>
                <Button onClick={() => onClickBtnDelete(item)} danger>
                  លុប
                </Button>
              </Space>
            ),
          },
        ]}
      />

      {/* Modal Form */}
      <Modal
        title={
          formCat.getFieldValue("id") == null
            ? "បន្ថែមថ្មី បណ្តាញសង្គម និងទីតាំង Google"
            : "កែប្រែ បណ្តាញសង្គម និងទីតាំង Google"
        }
        open={open}
        onCancel={onCloseModule}
        footer={null}
        maskClosable={false}
      >
        <Form form={formCat} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="ចំណង់ជើង ១"
                name="title1"
                rules={[{ required: true, message: "សូមបំពេញ!" }]}
              >
                <Input style={fontSize} placeholder="ចំណង់ជើង ១" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ចំណង់ជើង ២" name="title2">
                <Input style={fontSize} placeholder="ចំណង់ជើង ២" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ចំណង់ជើង ៣" name="title3">
                <Input style={fontSize} placeholder="ចំណង់ជើង ៣" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ចំណង់ជើង ៤" name="title4">
                <Input style={fontSize} placeholder="ចំណង់ជើង ៤" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="អ៊ីម៉ែល" name="email">
                <Input style={fontSize} placeholder="អ៊ីម៉ែល" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ទូរស័ព្ទ" name="phone">
                <Input style={fontSize} placeholder="ទូរស័ព្ទ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Facebook Link" name="facebookLink">
                <Input style={fontSize} placeholder="Facebook Link" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Google Map Link" name="googleLink">
                <Input style={fontSize} placeholder="Google Map Link" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="ពិណនាលម្អិច" name="description">
                <Input.TextArea style={fontSize} rows={3} placeholder="ពិណនាលម្អិច" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="CopyRight" name="copyRight">
                <Input style={fontSize} placeholder="CopyRight" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "សូមជ្រើសរើស!" }]}
              >
                <Select style={fontSize}>
                  <Select.Option value="1">Active</Select.Option>
                  <Select.Option value="0">Inactive</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCloseModule}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {formCat.getFieldValue("id") == null ? "រក្សាទុក" : "កែប្រែ"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </MainPage>
  );
};

export default FootsSocailMediaPage;
