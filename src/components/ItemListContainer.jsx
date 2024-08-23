import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();

    const refCollection = !id
      ? collection(db, "ecommercecarru")
      : query(collection(db, "ecommercecarru"), where("categoryid", "==", id));

    getDocs(refCollection)
      .then((snapshot) => {
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Container className="mt-4">Wait</Container>;

  if (items.length === 0)
    return <Container className="mt-4">No hay productos disponibles</Container>;
  console.log(items);

  return (
    <Container className="mt-4">
      <h1>Productos</h1>
      <Container>
        <div className="row g-4">
          {items.map((i) => (
            <div key={i.id} className="col-sm-6 col-md-4 col-lg-3">
              <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={i.image} height={200} />
                <Card.Body>
                  <Card.Title>{i.title}</Card.Title>
                  <Card.Text>{i.description}</Card.Text>
                  <Card.Text>{i.categoryid}</Card.Text>
                  <Link to={`/item/${i.id}`}>
                    <Button variant="primary">Ver</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
};
