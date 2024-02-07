import { useState } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import styles from "./AdvertForm.module.scss";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const AdvertForm = ({ action, actionText, isAddAdvert, ...props }) => {
  const [title, setTitle] = useState(props.title || "");
  const [price, setPrice] = useState(props.price || "");
  const [location, setLocation] = useState(props.location || "");
  const [text, setText] = useState(props.text || "");
  const [img, setImg] = useState(null);
  const [date] = useState(props.date || "");

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const imgFieldValidation = isAddAdvert
    ? { required: true }
    : { required: false };

  const handleSubmit = () => {
    if (title && price && location && text) {
      action({ title, price, location, text, img, date });
    }
  };

  return (
    <Col sm={12} lg={6} xl={4} className="mx-auto">
      <Form onSubmit={validate(handleSubmit)} className={styles.form}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>What do you want to sell?</Form.Label>
          <Form.Control
            {...register("title", {
              required: true,
              minLength: 10,
              maxLength: 50,
            })}
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <small className="d-block form-text text-danger mt-2">
              Title length is incorrect (min is 10, max is 50)
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Name your price!</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              {...register("price", { required: true })}
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && (
              <small className="d-block form-text text-danger mt-2">
                Price can't be empty
              </small>
            )}
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Where are you?</Form.Label>
          <Form.Control
            {...register("location", { required: true })}
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {errors.location && (
            <small className="d-block form-text text-danger mt-2">
              Location can't be empty
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Tell us more about your item</Form.Label>
          <Form.Control
            {...register("text", {
              required: true,
              minLength: 20,
              maxLength: 1000,
            })}
            as="textarea"
            placeholder="Enter description"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {errors.text && (
            <small className="d-block form-text text-danger mt-2">
              Content length is incorrect (min is 20, max is 1000)
            </small>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Give us a photo of your item</Form.Label>
          <Form.Control
            {...register("img", imgFieldValidation)}
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
          />
          {errors.img && (
            <small className="d-block form-text text-danger mt-2">
              Photo can't be empty
            </small>
          )}
        </Form.Group>
        <Button type="submit" className={styles.button}>
          {actionText}
        </Button>
      </Form>
    </Col>
  );
};

AdvertForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  isAddAdvert: PropTypes.bool,
  ...PropTypes.object
}

export default AdvertForm;
