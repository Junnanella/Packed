import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { loadPackingLists } from "./MainApi";
import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./pages.css";

export const PackingLists = () => {
  const [packingLists, setPackingLists] = useState([]);
  const { authTokens } = useContext(AuthContext);
  // state for user input in search bar
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  // store options for card background images
  const imageClasses = ["img_01", "img_02", "img_03", "img_04", "img_05"];

  // pull logged in user's saved packing lists
  useEffect(() => {
    async function fetchData() {
      const packingLists = await loadPackingLists(authTokens);
      setPackingLists(packingLists);
    }
    fetchData();
  }, [authTokens]);

  // navigate user to packing list detail page for corresponding card that they click
  const detailListUrl = (list) => {
    navigate("/packing_list", { state: { packingList: list } });
  };

  const onChangeSearchInput = (event) => {
    setInputText(event.target.value);
  };

  // navigate user who has no saved packing lists back to homepage
  const navigateHome = () => {
    navigate("/");
  };

  // if the logged in user has no packing list, render this
  const emptyList = (
    <>
      <Container className="main-container shadow text-center py-4">
        <div>
          <h5>Looks like you have no saved packing lists. </h5>
          <h4>Let's change that!</h4>
          <button
            className="no-packing-lists-button shadow"
            onClick={navigateHome}
          >
            head back to the homepage
          </button>
        </div>
      </Container>
    </>
  );

  // if the logged in user does have saved packing lists, render this
  const hasLists = (
    <>
      <Container className="main-container shadow">
        <Form className="d-flex search-form ms-auto">
          <Form.Control
            onChange={onChangeSearchInput}
            value={inputText}
            type="search"
            placeholder="Search"
            className="me-2 search-input"
            aria-label="Search"
          />
        </Form>
        <Row>
          {packingLists
            .filter((item) => {
              const searchInput = inputText.toLowerCase();
              const itemTitle = item.title.toLowerCase();

              return itemTitle.includes(searchInput);
            })
            .map((list, k) => {
              const options = {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              };
              const departureDate = new Date(
                list.departure_date
              ).toLocaleDateString("en-US", options);
              const returnDate = new Date(list.return_date).toLocaleDateString(
                "en-US",
                options
              );
              return (
                <Col key={k} xs={12} md={6} lg={4}>
                  <Card className={imageClasses[list.id % 5]}>
                    <Card.Body>
                      <div className="card-details">
                        <Card.Title>{list.title}</Card.Title>
                        <Card.Text>
                          Departure: {departureDate}
                          <br />
                          Return: {returnDate}
                        </Card.Text>
                      </div>
                    </Card.Body>
                    <button
                      className="stretched-link card-button"
                      onClick={(e) => detailListUrl(list)}
                    ></button>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );

  return packingLists.length > 0 ? hasLists : emptyList;
};
