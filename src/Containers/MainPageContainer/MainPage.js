import React from "react";
import { Form, FormGroup, Input, Label, Row, Col, Container, InputGroup, InputGroupAddon, Badge, Button } from "reactstrap";
import { Image } from "react-bootstrap";
import style from "./style.module.css";
import "./style.css";
import search from "./search.svg";
import SearchOption from "./components/searchOption";
import imageTypes from "../../data/imageTypes";
import orientations from "../../data/orientation";
import categories from "../../data/categories";
import colors from "../../data/colors";
import imageNums from "../../data/imageNums";
import filterTypes from "../../data/filterTypes";

export default class MainPage extends React.Component {

    constructor() {
        super()
        this.state = {
            filterBlockIsOpened: false,
            imageTypes: imageTypes,
            orientations: orientations,
            categories: categories,
            colors: colors,
            filterTypes: filterTypes,
            currentFilterDataName: ""
        }

        this.toggleFilter = this.toggleFilter.bind(this)
        this.toggleFilterType = this.toggleFilterType.bind(this)
        this.getFilterOptionsByName = this.getFilterOptionsByName.bind(this)
        this.getDataByName = this.getDataByName.bind(this)
        this.toggleColor =  this.toggleColor.bind(this)
    }

    toggleFilter() {
        this.setState((state) => ({
            filterBlockIsOpened: !state.filterBlockIsOpened
        }))
    }

    toggleFilterType(e) {
        const name = e.target.innerHTML
        console.log("Name: ", name)
        console.log("TARGET NAME: ", e.target.name)
        let data = this.getFilterOptionsByName(e.target.name)
        console.log("Data: ", data)
        data.find(el => el.name === name).selected = true
        data.filter(el => el.name !== name && el.selected === true).map((el) => (el.selected = false))
        this.setState((state) => ({
            [state.currentFilterDataName]: data
        }))
    }

    getFilterOptionsByName(name) {
        this.setState(() => ({
            currentFilterDataName: name
        }))
        return this.getDataByName(name)
    }

    getDataByName(name) {
        switch (name) {
            case "Image type":
                return this.state.imageTypes
            case "Orientation":
                return this.state.orientations
            case "Categories":
                return this.state.categories
            case "Image color style":
                return this.state.colors
            default:
                console.log("INVALID NAME FOR FILTER DATA");
                return null;
        }
    }

    toggleColor(e) {
        const data = this.state.colors
        const name = e.target.innerHTML
        const changedElement = data.find(el => el.name === name)
        console.log(changedElement)
        changedElement.selected = !changedElement.selected
        this.setState(() => ({
            colors: data
        }))
        console.log(this.state.colors)
    }

    render() {
        return (
            <div>
                <h1 className={style.originText}>Pixaby Photo Selector</h1>
                <Container>
                    <Form>
                        <Row className={style.searchBar}>
                            <Col md="5">
                                <FormGroup>
                                    <InputGroup>
                                        <Input placeholder="Type associative keywords" />
                                        <InputGroupAddon addonType="append">
                                            <Badge href="#" color="primary">
                                                {<Image src={search} className={style.searchIcon} />}
                                            </Badge>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ textAlign: "center" }}>
                                <Button color="secondary" outline size="sm" onClick={this.toggleFilter}><h6>Filter</h6></Button>
                            </Col>
                        </Row>
                        {this.state.filterBlockIsOpened ?
                            <div className="filterBlock">
                                {this.state.filterTypes.map((e) => {
                                    return (
                                        <Row key={e}>
                                            <Col md="8">
                                                <SearchOption data={this.getDataByName(e)} color="primary" name={e} toggle={e!=="Image color style" ? this.toggleFilterType : this.toggleColor} />
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </div>
                            : null}
                        <Row>
                            <Col md="8">
                                <SearchOption data={imageNums} name="Images per page" />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}