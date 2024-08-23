import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ItemsContext } from "../contexts/ItemsContext";
import { ItemCount } from "./itemCount";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { addItem } = useContext(ItemsContext);

  const onAdd = (count) => {
    addItem({ ...item, quantity: count });
  };

  useEffect(() => {
    const db = getFirestore();
    const refDoc = doc(db, "ecommercecarru", id);

    getDoc(refDoc)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItem({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.log("No such document!");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container className="mt-4">Cargando...</Container>;
  if (!item) return <Container className="mt-4">No hay productos disponibles</Container>;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <img src={item.image} alt={item.title} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h1>{item.title}</h1>
          <h2 className="text-muted">{item.categoryid}</h2>
          <h3>{item.description}</h3>
          <b className="d-block mt-2">${item.price.toFixed(2)}</b>
          <ItemCount stock={item.stock} onAdd={onAdd} />
        </Col>
      </Row>
    </Container>
  );
};

