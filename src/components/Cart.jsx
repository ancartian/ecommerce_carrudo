import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ItemsContext } from "../contexts/ItemsContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  confirmEmail: "",
};

export const Cart = () => {
  const [buyer, setBuyer] = useState(initialValues);
  const { reset, removeItem, items } = useContext(ItemsContext);
  const navigate = useNavigate();

  const CantTotalProductos = () => {
    return Array.isArray(items) ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid = () => {
    return (
      buyer.firstName &&
      buyer.lastName &&
      buyer.phone &&
      buyer.email &&
      buyer.email === buyer.confirmEmail
    );
  };

  const TotalCompra = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const db = getFirestore();
    const order = {
      buyer: {
        firstName: buyer.firstName,
        lastName: buyer.lastName,
        phone: buyer.phone,
        email: buyer.email,
      },
      items: items,
      date: new Date(),
    };

    try {
      const orderRef = await addDoc(collection(db, "orders"), order);
      alert(`Compra efectuada con éxito! Número de orden: ${orderRef.id}`);
      reset(); // Resetear el carrito
      navigate("/"); // Redirigir al inicio
    } catch (error) {
      console.error("Error al realizar la compra: ", error);
      alert("Hubo un error al realizar la compra. Inténtalo de nuevo.");
    }
  };

  if (CantTotalProductos() === 0) {
    return (
      <Container className="text-center mt-4">
        <p className="display-1">🛒</p>
        <div className="alert alert-info" role="alert">
          ¡No se encontraron productos en el Carrito!
        </div>
        <Link to={"/"} className="btn btn-primary my-5">
          Volver a la Página Principal
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Button variant="danger" onClick={reset} className="mb-3">
        Vaciar Carrito
      </Button>
      <Row>
        {items.map((i) => (
          <Col md={4} key={i.id} className="mb-4">
            <div className="card">
              <img src={i.image} alt={`${i.title}`} className="card-img-top" height={200} />
              <div className="card-body">
                <h5 className="card-title">{i.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">$ {i.price.toFixed(2)}</h6>
                <p className="card-text">Cantidad: {i.quantity}</p>
                <Button variant="danger" onClick={() => removeItem(i.id)}>Eliminar</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <h2>Datos del Comprador</h2>
      <form onSubmit={handleOrder}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={buyer.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={buyer.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" id="phone" name="phone" value={buyer.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input type="email" className="form-control" id="email" name="email" value={buyer.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmEmail" className="form-label">Confirmar E-mail</label>
          <input type="email" className="form-control" id="confirmEmail" name="confirmEmail" value={buyer.confirmEmail} onChange={handleChange} required />
        </div>
        <h3>Total de la compra: $ {TotalCompra()}</h3>
        <Button variant="success" type="submit" disabled={!isFormValid()}>
          Realizar Compra
        </Button>
      </form>
    </Container>
  );
};
