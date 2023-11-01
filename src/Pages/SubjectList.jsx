import React from "react";
import { useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { Form } from "react-router-dom";

const SubjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="container border-0" style={{ marginTop: "17px" }}>
      <Card>
        <Card.Header>
          <Row>
            <Col sm={6}>
              <h2>Manager Product </h2>
            </Col>
            <Col sm={6}>
              <Button
                variant="info"
                onClick={() => {
                  //   setShowModal(true);
                }}
              >
                Mới
              </Button>
              <Button
                variant="outline-dark"
                onClick={() => {
                  window.history.back(-1);
                }}
                style={{ marginLeft: "70%" }}
              >
                Quay lại
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4} className="m-2">
              <div className="d-flex">
                <Button
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  //   onChange={(e) => setSearchName(e.target.value)}
                />
                {/* {errorMessage && (
                      <div className="error-message" style={{ color: "red" }}>
                        {errorMessage}
                      </div>
                    )} */}
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <div className="scrollable-area" style={{ overflow: "auto" }}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th style={{ cursor: "pointer"}}>ID</th>
                  <th>Code</th>
                  <th style={{ cursor: "pointer" }}>Description</th>
                  <th>Manager</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </Table>
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          {/* <Pagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        {/* <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}> */}
        {/* <Form>
              <Modal.Header closeButton>
                <Modal.Title>
                  {isEditing
                    ? `Chỉnh sửa sản phẩm (ID:${updateProduct.id})`
                    : "Thêm mới sản phẩm"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Tên</InputGroup.Text>
                  <Form.Control
                    placeholder="Product Name"
                    aria-label="product_name"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            name: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            name: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.name : ""}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">Giá</InputGroup.Text>
                  <Form.Control
                    placeholder="Price"
                    aria-label="product_price"
                    aria-describedby="basic-addon3"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            price: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            price: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.price : ""}
                    required
                  />
                  <InputGroup.Text>đ</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {categories.map((category, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setNewProductAdd((prevProduct) => ({
                              ...prevProduct,
                              catId: category.id,
                            }));
                          }}
                        >
                          {`${category.name} (${category.id})`}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Form.Control
                    placeholder={isEditing ? updateProduct.catId : "Category"}
                    aria-label="product_category"
                    aria-describedby="basic-addon3"
                    defaultValue={isEditing ? updateProduct.catId : ""}
                    value={newProductAdded.catId ? newProductAdded.catId : ""}
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            catId: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            catId: e.target.value,
                          }));
                    }}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Description</InputGroup.Text>
                  <Form.Control
                    placeholder="Description"
                    as="textarea"
                    aria-label="With textarea"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            description: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            description: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.description : ""}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <DropdownButton
                    variant="outline-secondary"
                    title="Size"
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item
                      onClick={(e) => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          size: SIZE_KEY.shirts,
                        }));
                      }}
                    >
                      Áo
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          size: SIZE_KEY.pants,
                        }));
                      }}
                    >
                      Quần
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        setNewProductAdd((prevProduct) => ({
                          ...prevProduct,
                          size: SIZE_KEY.shoes,
                        }));
                      }}
                    >
                      Giầy/Dép
                    </Dropdown.Item>
                  </DropdownButton>
                  <Form.Control
                    placeholder={
                      isEditing ? updateProduct.size : "Separated by commas"
                    }
                    aria-label="product_category"
                    defaultValue={isEditing ? updateProduct.size : ""}
                    value={newProductAdded.size ? newProductAdded.size : ""}
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            size: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            size: e.target.value,
                          }));
                    }}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Color</InputGroup.Text>
                  <Form.Control
                    placeholder="Separated by commas"
                    aria-label="product_color"
                    aria-describedby="basic-addon3"
                    defaultValue={isEditing ? updateProduct.color : ""}
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            color: e.target.value
                              ? e.target.value.split(",")
                              : e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            color: e.target.value
                              ? e.target.value.split(",")
                              : e.target.value,
                          }));
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Quantity</InputGroup.Text>
                  <Form.Control
                    placeholder="Quantity"
                    aria-label="product_quantity"
                    aria-describedby="basic-addon3"
                    onChange={(e) => {
                      isEditing
                        ? setUpdateProduct((prevProduct) => ({
                            ...prevProduct,
                            amount: e.target.value,
                          }))
                        : setNewProductAdd((prevProduct) => ({
                            ...prevProduct,
                            amount: e.target.value,
                          }));
                    }}
                    defaultValue={isEditing ? updateProduct.amount : ""}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Image</InputGroup.Text>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      reader.onloadend = async () => {
                        const imageDataUrl = reader.result;

                        const formData = new FormData();
                        formData.append("file", imageDataUrl);
                        formData.append("upload_preset", `shop_assets`);

                        await uploadImage(formData)
                          .then((imageUrl) => {
                            isEditing
                              ? setUpdateProduct((prevProduct) => ({
                                  ...prevProduct,
                                  img: imageUrl,
                                }))
                              : setNewProductAdd((prevProduct) => ({
                                  ...prevProduct,
                                  img: imageUrl,
                                }));
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      };

                      if (file) {
                        reader.readAsDataURL(file);
                      }
                    }}
                    required
                  />
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();

                      reader.onloadend = async () => {
                        const imageDataUrl = reader.result;
                        //them anh vao cloudiary
                        const formData = new FormData();
                        formData.append("file", imageDataUrl);
                        formData.append("upload_preset", `shop_assets`);

                        await uploadImage(formData)
                          .then((imageUrl) => {
                            isEditing
                              ? setUpdateProduct((prevProduct) => ({
                                  ...prevProduct,
                                  blurImg: imageUrl,
                                }))
                              : setNewProductAdd((prevProduct) => ({
                                  ...prevProduct,
                                  blurImg: imageUrl,
                                }));
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      };

                      if (file) {
                        reader.readAsDataURL(file);
                      }
                    }}
                    required
                  />
                </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={
                    isEditing
                      ? () => {
                          handleClickSaveEdit(updateProduct.id);
                        }
                      : () => {}
                  }
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form> */}
      </Modal>
    </div>
  );
};

export default SubjectList;
