import { Button, Col, Form, Image, Input, Row, Typography } from "antd";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";

const { Title } = Typography;

interface Document {
  file: File | null;
  description: string;
}

interface AddDocumentsProps {
  data: Document[];
  setData: React.Dispatch<React.SetStateAction<Document[]>>;
  type: "detail" | "recipt";
}

const AddDocuments: React.FC<AddDocumentsProps> = ({ data, setData, type }) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedDocuments = [...data];
    if (e.target.files && e.target.files.length > 0) {
      updatedDocuments[index].file = e.target.files[0];
      setData(updatedDocuments);
    }
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDocuments = [...data];
    updatedDocuments[index].description = value;
    setData(updatedDocuments);
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = data.filter((_, i) => i !== index);
    setData(updatedDocuments);
  };

  const handleAddDocument = () => {
    setData([...data, { file: null, description: "" }]);
  };

  const renderImagePreviews = () => {
    return data.map((document: Document, index: number) => (
      <Row key={index} className=" border p-2" gutter={16}>
        <Col span={12}>
          <>
            <Form.Item
              label={`Select ${type === "recipt" ? "Recipt" : "File"} ${
                index + 1
              }`}
              layout="vertical"
              rules={[{ required: true }]}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
              />
            </Form.Item>
          </>
        </Col>
        {document.file && (
          <>
            <Col span={12}>
              <Form.Item
                label={`Description for Image ${index + 1}`}
                layout="vertical"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder={`Description for Image ${index + 1}`}
                  value={document.description}
                  className="p-2"
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12} className="text-center">
              <Image
                className="border border-1"
                src={URL.createObjectURL(document.file)}
                width={100}
                alt={`Selected image ${index + 1}`}
              />
            </Col>
          </>
        )}
        <Col span={12}>
          <Form.Item label={`Remove this item`} layout="vertical">
            <Button
              danger
              type="dashed"
              className="w-100"
              onClick={() => handleRemoveDocument(index)}
              icon={<DeleteIcon />}
            >
              Remove
            </Button>
          </Form.Item>
        </Col>
      </Row>
    ));
  };

  return (
    <>
      <Form layout="vertical">
        <Form.Item
          label={`Select ${type === "recipt" ? "Recipt" : "File"}`}
          name="files"
        >
          <Button
            onClick={handleAddDocument}
            type="dashed"
            className=" w-100"
            icon={<PlaylistAddIcon />}
          >
            Add More Files
          </Button>
        </Form.Item>
      </Form>
      {data.length > 0 && (
        <>
          <hr />
          <Title level={5}>
            Selected {type === "recipt" ? "Recipt" : "File"} and Descriptions
          </Title>
          <div className="row gap-2">{renderImagePreviews()}</div>
        </>
      )}
    </>
  );
};

export default AddDocuments;
