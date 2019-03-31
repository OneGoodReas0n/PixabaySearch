import React from "react";
import { FormGroup, Row, Col, Label, Badge } from "reactstrap";

export default function option(props) {

    return (
        <FormGroup>
            <Row>
                <Col>
                    <Label><h5>{props.name}</h5></Label>
                </Col>
            </Row>
            <Row>
                <Col>
                    {props.name === "Image color style" ? props.data.map(el => (
                        <Badge className="searchOptionItem colorBox searchOptionItemText" name={props.name} href="#" key={el.name} style={el.name === "transparent" || el.name === "white" || el.name === "yellow" ? { backgroundColor: el.name, color: 'black' } : { backgroundColor: el.name }} key={el.name} >{el.name}</Badge>
                    )) : props.toggle ? props.data.map(el => (
                        <Badge className="searchOptionItem searchOptionItemText" name={props.name} href="#" color={el.selected ? "success" : props.color} key={el.name} onClick={props.toggle}>{el.name}</Badge>
                    ))
                            : props.data.map(el => (
                                <Badge className="searchOptionItem searchOptionItemText" name={props.name} href="#" color={props.color} key={el.name}>{el.name}</Badge>
                            ))}
                </Col>
            </Row>
        </FormGroup>
    )
}