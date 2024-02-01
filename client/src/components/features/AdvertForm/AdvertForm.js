import { useState } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AdvertForm.module.scss";

const AdvertForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [date, setDate] = useState("");

  return (
    <Col sm={12} lg={6} xl={4} className="mx-auto">
      <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>What do you want to sell?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Name your price!</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Where are you?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Tell us more about your item</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Give us a photo of your item</Form.Label>
          <Form.Control
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDate">
          <Form.Label>What day is it?</Form.Label>
          <br />
          <DatePicker
            name="date"
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </Form.Group>
        <Button type="submit" className={styles.button}>
          submit
        </Button>
      </Form>
    </Col>
  );
};

export default AdvertForm;
