import React, { useEffect, useState, useRef } from "react";
import { request } from "../config/request";
import {
  Table,
  Button,
  Space,
  Modal,
  Input,
  Form,
  message,
  Col,
  Row,
  Image,
  Spin,
} from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/km"; // Khmer locale
import MainPage from "../component/page/MainPage";
import "react-quill/dist/quill.snow.css";
import "../component/assets/css/TextEditor.css";
import { Config, isEmptyOrNull } from "../config/helper";

const { TextArea } = Input;

const PackageservicelisthomePage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);

  // View Modal
  const [viewItem, setViewItem] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Form
  const [formCat] = Form.useForm();

  // File Upload
  const [fileSelected, setFileSelected] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileRef = useRef(null);

  // Edit Mode
  const [isEditMode, setIsEditMode] = useState(false);

  const filterRef = useRef({ txt_search: null });

  useEffect(() => {
    getList();
  }, []);

  /** ===========================
   *  Fetch List
   *  ===========================
   */
  const getList = async () => {
    setLoading(true);
    try {
      const param = { txt_search: filterRef.current.txt_search };
      const res = await request("packageservicelisthome/getList", "get", param);
      if (res) setList(res.list);
    } catch (error) {
      message.error("Failed to fetch the list");
    } finally {
      setLoading(false);
    }
  };

  /** ===========================
   *  Refresh with cache clear
   *  ===========================
   */
  const clearCachesAndRefresh = async () => {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
    }
    setRefreshLoading(true);
    setTimeout(() => {
      getList();
      setRefreshLoading(false);
    }, 1000);
  };

 
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileSelected(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const onRemoveFileSelected = () => {
    if (fileRef.current) fileRef.current.value = null;
    setFilePreview(null);
    setFileSelected(null);
  };

  /** ===========================
   *  Modal Handlers
   *  ===========================
   */
  const openNewModal = () => {
    formCat.resetFields();
    setFilePreview(null);
    setFileSelected(null);
    setIsEditMode(false);
    setOpen(true);
  };

  const onCloseModule = () => {
    formCat.resetFields();
    setOpen(false);
    setIsEditMode(false);
  };

  const onClickBtnEdit = (item) => {
    setIsEditMode(true);
    formCat.setFieldsValue({ ...item, image: item.Image });
    setFilePreview(Config.image_path + item.Image);
    setOpen(true);
  };

  /** ===========================
   *  Khmer Date & Numerals
   *  ===========================
   */
  const toKhmerNumeral = (num) => {
    const khmerNumerals = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return num.toString().split("").map((d) => khmerNumerals[d]).join("");
  };

  const formatKhmerDate = (date) => {
    const day = toKhmerNumeral(dayjs(date).date());
    const month = dayjs(date).locale("km").format("MMMM");
    const year = toKhmerNumeral(dayjs(date).year());
    return `ថ្ងៃទី${day} ខែ${month} ${year}`;
  };

  
  const onFinish = async (item) => {
    setModalLoading(true);
    const id = formCat.getFieldValue("id");

    const form = new FormData();
    form.append("id", id);
    form.append("title1", item.title1);
    form.append("title2", item.title2);
    form.append("title3", item.title3);
    form.append("title4", item.title4);
    form.append("list1", item.list1);
    form.append("list2", item.list2);
   
    const method = id == null ? "post" : "put";
    const url =
      id == null ? "packageservicelisthome/create" : "packageservicelisthome/update";

    try {
      const res = await request(url, method, form);
      if (res?.error) {
        const mgs = Object.values(res.message).join("");
        message.error(mgs);
        return;
      }
      message.success(res.message);
      await getList();
      onCloseModule();
      clearCachesAndRefresh();
      window.location.reload();
    } catch {
      message.error("ការរក្សាទុករបស់លោកអ្នកមិនទទួលបានជោគជ័យទេ!");
    } finally {
      setModalLoading(false);
    }
  };


  const handleView = (item) => {
    setViewItem(item);
    setIsViewModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setViewItem(null);
  };

  /** ===========================
   *  Table Columns
   *  ===========================
   */
  const columns = [
    {
      key: "No",
      title: "ល.រ",
      align: "left",
      width: 60,
      render: (_, __, index) => index + 1,
    },
    {
      key: "title1",
      title: "ចំណង់ជើង 1",
      dataIndex: "title1",
    },
    {
      key: "title2",
      title: "ចំណង់ជើង 2",
      dataIndex: "title2",
    },
    {
      key: "email",
      title: "អ៊ីមែល",
      dataIndex: "email",
    },
    {
      key: "phone",
      title: "ទូរស័ព្ទ",
      dataIndex: "phone",
    },
    {
      key: "Image",
      title: "រូបភាព",
      dataIndex: "Image",
      render: (value) =>
        value ? (
          <Image src={Config.image_path + value} alt="" width={60} />
        ) : (
          <div style={{ height: 30, width: 25, backgroundColor: "#888" }} />
        ),
    },
    {
      key: "CreateAt",
      title: "ថ្ងៃបង្កើត",
      dataIndex: "CreateAt",
      render: (value) => formatKhmerDate(value),
    },
    {
      key: "Actions",
      title: "សកម្មភាព",
      render: (_, item) => (
        <Space>
          <Button onClick={() => onClickBtnEdit(item)}>កែប្រែ</Button>
          <Button onClick={() => handleView(item)}>មើល</Button>
        </Space>
      ),
    },
  ];

  return (
    <MainPage loading={loading}>
      {/* Global Loading Overlay */}
      {refreshLoading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <Space>
          <div className="txt_title">បណ្តាញសង្គម</div>
          <Input.Search
            allowClear
            onChange={(e) => {
              filterRef.current.txt_search = e.target.value;
              getList();
            }}
            placeholder="ស្វែងរក"
          />
        </Space>
        <Button onClick={openNewModal} type="primary">
          បន្ថែមថ្មី
        </Button>
      </div>

      <hr />

      {/* Table */}
      <Spin spinning={loading}>
        <Table
          dataSource={list}
          pagination={{ pageSize: 7 }}
          rowKey="id"
          columns={columns}
        />
      </Spin>

      {/* Add/Edit Modal */}
      <Modal
        title={
          isEditMode
            ? "កែប្រែ | List Package Service Home"
            : "បន្ថែម | List Package Service Home"
        }
        open={open}
        maskClosable={false}
        onCancel={onCloseModule}
        footer={null}
        width="60%"
      >
        <Spin spinning={modalLoading}>
          <Form form={formCat} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="ចំណង់ជើង 1"
                  name="title1"
                  rules={[{ required: true, message: "សូមបំពេញចំណង់ជើង 1!" }]}
                >
                  <Input placeholder="ចំណង់ជើង 1" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ចំណង់ជើង 2" name="title2">
                  <Input placeholder="ចំណង់ជើង 2" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="ចំណង់ជើង 3" name="title3">
                  <Input placeholder="ចំណង់ជើង 3" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ចំណង់ជើង 4" name="title4">
                  <Input placeholder="ចំណង់ជើង 4" />
                </Form.Item>
              </Col>
            </Row>
       
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="list1" name="list1">
                  <Input placeholder="list1 URL" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="list2" name="list12">
                  <Input placeholder="list2" />
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
        </Spin>
      </Modal>

      {/* View Modal */}
      <Modal
        open={isViewModalOpen}
        onCancel={handleViewModalClose}
        footer={[
          <Button key="close" onClick={handleViewModalClose}>
            បិទវិញ
          </Button>,
        ]}
      >
        {viewItem && (
          <div style={{ textAlign: "justify", padding: "8px" }}>
            <p>
              <strong>ចំណង់ជើង 1:</strong> {viewItem.title1}
            </p>
            <p>
              <strong>ចំណង់ជើង 2:</strong> {viewItem.title2}
            </p>
            <p>
              <strong>ចំណង់ជើង 3:</strong> {viewItem.title3}
            </p>
            <p>
              <strong>ចំណង់ជើង 4:</strong> {viewItem.title4}
            </p>
            <p>
              <strong>Email:</strong> {viewItem.email}
            </p>
            <p>
              <strong>Phone:</strong> {viewItem.phone}
            </p>
            <p>
              <strong>Facebook:</strong> {viewItem.facebookLink}
            </p>
            <p>
              <strong>Google:</strong> {viewItem.googleLink}
            </p>
            <p>
              <strong>Copy Right:</strong> {viewItem.copyRight}
            </p>
            <p>
              <strong>មាតិកា:</strong> {viewItem.description}
            </p>
            {viewItem.Image && (
              <Image src={Config.image_path + viewItem.Image} alt="" width={200} />
            )}
            <p>
              <strong>ថ្ងៃបង្កើត:</strong> {formatKhmerDate(viewItem.CreateAt)}
            </p>
          </div>
        )}
      </Modal>
    </MainPage>
  );
};

export default PackageservicelisthomePage;
