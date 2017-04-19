import React, { Component } from 'react';
import { Link } from 'react-router'
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux'
import { Tabs, Tab, FlatButton, RaisedButton, TextField, Dialog, Checkbox, FontIcon } from 'material-ui';
import { Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { ProductAction } from "../store/action/product"
import { firebaseService } from "../service/firebaseService"

function mapStateToProps(state) {
    return {
        products: state.ProductReducer.products,
        loading: state.ProductReducer.loading,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addProduct: (product) => dispatch(ProductAction.addProduct(product)),
        getProducts: () => dispatch(ProductAction.getProducts()),
        getProductsCancel: () => dispatch(ProductAction.getProductsCancel()),
        updateProduct: (key, product) => dispatch(ProductAction.updateProduct(key, product)),
        deleteProduct: (key) => dispatch(ProductAction.deleteProduct(key)),
    };
}
const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};
class ProductVerifier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '200px',

            isEditing: false,
            editingKey: null,
            editingValue: null
        };
        this.addTodo = this.addTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.editTodoSave = this.editTodoSave.bind(this);
        this._handleFromChange = this._handleFromChange.bind(this);
        this.props.getProducts(); //start getting todo from firebase
    }
    componentWillReceiveProps(nextProps) {
        console.log("next props: ", nextProps.products);
        if (Object.keys(nextProps.products).length == 0) {
            console.log("getting data for uid: ", );
            this.props.getProducts(); //start getting todo from firebase
        }
    }
    _handleFromChange(e) {
        // console.log("name: ", e.target.name);
        // console.log("value: ", e.target.value);

        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
    addTodo(e) {
        e.preventDefault();
        console.log("pushing todo component: ", this.state);
        this.props.addTodo(
            this.props.authUser.uid,
            {
                "companyName": this.state.companyName,
                "companyAddress": this.state.companyAddress,
                "companyIsVisited": false,
                "companyVisitedDate": null,
                "companySendStatus": false,
                "companyRemarks": "",
            }
        );
        this.setState({ ...this.state, companyName: "", companyAddress: "" });
    }
    deleteTodo(key) {
        this.props.deleteTodo(this.props.authUser.uid, { key: key });
    }
    editTodo(key, dataObj) {
        this.setState({
            ...this.state,
            isEditing: true,
            editingKey: key,
            editCompanyName: dataObj.companyName,
            editCompanyAddress: dataObj.companyAddress
        })
    }
    editTodoSave() {
        this.props.updateTodo(
            this.props.authUser.uid,
            this.state.editingKey,
            { companyName: this.state.editCompanyName, companyAddress: this.state.editCompanyAddress, }
        );
        this.setState({ ...this.state, isEditing: false, editingKey: "", companyAddress: "", editCompanyName: "" })
    }
    markCompanyVisited(key, visited) {
        this.props.updateTodo(
            this.props.authUser.uid,
            key,
            { companyIsVisited: !visited, companyVisitedDate: firebaseService.timestamp() }
        );
    }
    giveRemarks(key, remark) {
        this.props.updateProduct(
            key,
            { productRemarks: remark }
        );
    }
    toggleReceived(key, received) {
        this.props.updateProduct(
            this.state.sampleTableKey + "/productSamples/" + key,
            { received: !received }
        );
        //refreshing sample table
        setTimeout(() => {
            this.setState({ ...this.state, sampleTable: this.props.products[this.state.sampleTableKey].productSamples })
        }, 0)
    }

    render() {
        let productTable = Object.keys(this.props.products).map((key, index) => {
            let val = this.props.products[key];
            if (val.productType === "A")
                return (
                    <TableRow id={index} key={index}
                        onTouchTap={
                            () => { this.setState({ ...this.state, sampleTableKey: key, sampleTable: this.props.products[key].productSamples }); console.log("sampletable: ", val) }
                        }
                    >
                        <TableRowColumn colSpan="1">{index + 1}</TableRowColumn>
                        <TableRowColumn colSpan="1">{val.productId}</TableRowColumn>
                        <TableRowColumn colSpan="1">{Object.keys(val.productSamples).length}</TableRowColumn>
                        <TableRowColumn colSpan="1">
                            {Object.keys(
                                val.productSamples.filter((val, index) => {
                                    console.log("filter:", val, index);
                                    if (val.received) return true
                                })
                            ).length}
                        </TableRowColumn>
                        <TableRowColumn colSpan="2">
                            <TextField value={val.productRemarks} floatingLabelText="Remarks" onChange={(e) => { this.giveRemarks(key, e.target.value) }} />
                        </TableRowColumn>
                    </TableRow >
                )
        })
        let sampleTable = Object.keys(this.state.sampleTable || []).map((key, index) => {
            let val = this.state.sampleTable[key];
            return (
                <TableRow id={index} key={index}>
                    {/*<TableRowColumn colSpan="1">{index + 1}</TableRowColumn>*/}
                    <TableRowColumn colSpan="1">{val.id}</TableRowColumn>
                    <TableRowColumn colSpan="1">
                        <Checkbox
                            disabled={val.received}
                            checked={val.received}
                            onCheck={() => { this.toggleReceived(key, val.received) }} />
                    </TableRowColumn>

                    <TableRowColumn colSpan="1">
                        <Checkbox
                            disabled={val.check || !val.received}
                            checked={val.check}
                            onCheck={() => { this.toggleCheck(key, val.check) }} />
                    </TableRowColumn>

                    <TableRowColumn colSpan="2">
                        {(val.receivedDate) ? <Timestamp time={val.receivedDate / 1000} /> : ""}
                    </TableRowColumn>

                    <TableRowColumn colSpan="2">
                        {(val.checkDate) ? <Timestamp time={val.checkDate / 1000} /> : ""}
                    </TableRowColumn>

                    <TableRowColumn colSpan="2">
                        <TextField disabled={!val.received} value={val.checkResult} floatingLabelText="Check Result" onChange={(e) => { this.giveRemarks(key, e.target.value) }} />
                    </TableRowColumn>

                    <TableRowColumn colSpan="2">
                        <TextField disabled={!val.received} value={val.remarks} floatingLabelText="Remarks" onChange={(e) => { this.giveRemarks(key, e.target.value) }} />
                    </TableRowColumn>
                </TableRow >
            )
        })
        const actions = [
            <FlatButton
                label="Cancel"
                primary={false}
                keyboardFocused={false}
                onTouchTap={() => { this.setState({ ...this.state, isEditing: false }) }}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.editTodoSave}
            />,
        ];

        return (
            <div>
                'product varifier'
            <Dialog
                    title="Edit"
                    actions={actions}
                    modal={false}
                    open={this.state.isEditing}
                >
                    <TextField
                        name="editCompanyName"
                        floatingLabelText="Company Name"
                        value={this.state.editCompanyName}
                        onChange={this._handleFromChange}
                    />
                    <TextField
                        name="editCompanyAddress"
                        floatingLabelText="Company Address"
                        value={this.state.editCompanyAddress}
                        onChange={this._handleFromChange}
                    />
                </Dialog>

                <Tabs>
                    <Tab label="Tab One" >

                        {/*Product Table*/}
                        <Table
                            height={this.state.height}
                            fixedHeader={this.state.fixedHeader}
                            fixedFooter={this.state.fixedFooter}
                            selectable={this.state.selectable}
                            multiSelectable={this.state.multiSelectable}
                        >
                            <TableHeader
                                displaySelectAll={this.state.showCheckboxes}
                                adjustForCheckbox={this.state.showCheckboxes}
                                enableSelectAll={this.state.enableSelectAll}
                            >
                                <TableRow>
                                    <TableHeaderColumn colSpan="6" tooltip="Header" style={{ textAlign: 'center' }}>
                                        Product Table
                                    </TableHeaderColumn>
                                </TableRow>
                                <TableRow>
                                    <TableHeaderColumn colSpan="1" tooltip="serial number">No.</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="1">Product Id</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="1">No. of Samples</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="1">No. of Samples Received</TableHeaderColumn>
                                    <TableHeaderColumn colSpan="2">Remark</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                            >
                                {productTable}
                            </TableBody>
                        </Table>
                    </Tab>
                    <Tab>
                        tab two
                    </Tab>
                </Tabs>






                {/*sample table*/}
                <Table
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="9" tooltip="Header" style={{ textAlign: 'center' }}>
                                Sample Table
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            {/*<TableHeaderColumn colSpan="1" tooltip="serial number">No.</TableHeaderColumn>*/}
                            <TableHeaderColumn colSpan="1">Sample Id</TableHeaderColumn>
                            <TableHeaderColumn colSpan="1">Received</TableHeaderColumn>
                            <TableHeaderColumn colSpan="1">Test</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Date</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Chk Date</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Chk Result</TableHeaderColumn>
                            <TableHeaderColumn colSpan="2">Remarks</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {sampleTable}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductVerifier)
