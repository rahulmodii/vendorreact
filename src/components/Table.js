import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// import { Document, Page } from 'react-pdf';
import { connect } from 'react-redux'
import { fetchVendor, fetchSingleVendor, fetchSearchVendor ,fetchCountries } from '../actions/vendorAction'
import Axios from 'axios';
import Iframe from 'react-iframe'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import { Col,Row } from 'react-bootstrap';
const initalstate = {
  show: false,
  showedit: false,
  showpdf: false,
  vendorname: '',
  firstname: '',
  lastname: '',
  country: '',
  address: '',
  image: '',
  pdfdocument: '',
  singlepdfurl: ''
};
class Vendortable extends React.Component {

  constructor(props) {
    super(props);
    this.state = initalstate;
  }
  componentDidMount() {
    this.props.fetchVendor();
    this.props.fetchCountries();
    // console.log('hee')

  }
  handleClose = () => {
    this.setState({
      show: false
    })
  }
  handleshow = () => {
    this.setState(initalstate)
    this.setState({
      show: true
    })

  }
  handleshowedit = () => {
    this.setState({
      showedit: true
    })
  }
  handleshowpdf = (data) => {
    this.setState({
      showpdf: true,
      singlepdfurl: data
    })
  }
  handleclosepdf = () => {
    this.setState({
      showpdf: false,
      singlepdfurl: ''
    })
  }
  handlecloseedit = () => {
    this.setState({
      showedit: false
    })
  }

  //form handels
  handelvendorname = (e) => {
    this.setState({
      vendorname: e.target.value
    })
  }

  handlefirstname = (e) => {
    this.setState({
      firstname: e.target.value
    })
  }

  handlelastname = (e) => {
    this.setState({
      lastname: e.target.value
    })
  }

  handlecountry = (e) => {
    this.setState({
      country: e.target.value
    })
  }

  handleaddress = (e) => {
    this.setState({
      address: e.target.value
    })
  }

  handelimage = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handlepdf = (e) => {
    this.setState({
      pdfdocument: e.target.files[0]
    })
  }

  handleedit = (id) => {
    this.props.fetchSingleVendor(id);
    if (this.props.singlevendor.length) {
      this.setState({
        vendorname: this.props.singlevendor[0].vendor_name,
        firstname: this.props.singlevendor[0].first_name,
        lastname: this.props.singlevendor[0].last_name,
        country: this.props.singlevendor[0].country,
        address: this.props.singlevendor[0].address
      })
      this.handleshowedit();
    } else {

    }
  }

  submitedit = () => {
    let formdata = new FormData();
    formdata.append("vendorname", this.state.vendorname);
    formdata.append("first_name", this.state.firstname);
    formdata.append("image", this.state.image);
    formdata.append("country", this.state.country);
    formdata.append("address", this.state.address);
    formdata.append("pdfdocument", this.state.pdfdocument);
    formdata.append("last_name", this.state.lastname);
    Axios.post(`http://127.0.0.1:8000/api/v1/vendoredit/${this.props.singlevendor[0].id}`, formdata)
      .then((response) => {
        this.setState(initalstate);
        this.props.fetchVendor();
        toast('vendor updated successfully')
      })
  }

  errorshandel = (response) =>{
    // response.map((u,i)=>{
      toast(response)
    // })
    // console.log(response)
  }
  handelsubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("vendorname", this.state.vendorname);
    formdata.append("first_name", this.state.firstname);
    formdata.append("image", this.state.image);
    formdata.append("country", this.state.country);
    formdata.append("address", this.state.address);
    formdata.append("pdfdocument", this.state.pdfdocument);
    formdata.append("last_name", this.state.lastname);

    Axios.post('http://127.0.0.1:8000/api/v1/createvendor', formdata)
      .then((response) => {
        if (response.data.status === 200) {
          this.setState(initalstate);
          this.props.fetchVendor();
          toast('vendor created successfully');
        }
        if (response.data.status === 201){
          response.data.data.map((u,i)=> {
            this.errorshandel(u)
          })
        }
       
      })
      .catch((response)=>{
        // console.log(response)
        this.errorshandel(response)
      })
  }

  fetchvendors = () => {
    if (this.props.vendors.length) {
      console.log(this.props.vendors.length)
    } else {
      console.log(this.props.vendors.length)
    }
  }

  searchvendor = (e) => {
    e.preventDefault()
    this.props.fetchSearchVendor(this.refs.query.value)
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col md={6}> <Button variant="primary" onClick={this.handleshow}>Create Vendor</Button></Col>
            <Col md={6}> <form onSubmit={this.searchvendor} ><input type="text" ref="query" /><input type="submit" /></form></Col>
          </Row>
        </Container>
    
        
       
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Vendor Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Country</th>
              <th>Address</th>
              <th>image</th>
              <th>pdfdocument</th>
              <th>edit</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.vendors.map((u, i) => {
                return (<tr key={i}>
                  <td>{i + 1}</td>
                  <td>{u.vendor_name}</td>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.country}</td>
                  <td>{u.address}</td>
                  <td> <img src={u.image} height="50px" width="50px" alt='one' /></td>
                  <td> <Button variant="primary" onClick={() => { this.handleshowpdf(u.pdfdocument) }}>View Pdf</Button></td>
                  <td><Button variant="primary" onClick={() => { this.handleedit(u.id) }}>Edit</Button></td>
                </tr>)
              })

            }

          </tbody>
        </Table>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Vendor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handelsubmit}>
              <input type="text" placeholder="vendorname" onChange={this.handelvendorname} value={this.state.vendorname} /><br />
              <input type="text" placeholder="firstname" onChange={this.handlefirstname} value={this.state.firstname} /><br />
              <input type="text" placeholder="lastname" onChange={this.handlelastname} value={this.state.lastname} /><br />
              <input type="text" placeholder="address" onChange={this.handleaddress} value={this.state.address} /><br />
              <select onChange={this.handlecountry}>
              <option disabled >---selectoption---</option>
                {
                  this.props.country.map((u,i)=>{
                    return  <option value={u.id} key={i}>{u.name}</option>
                  })
                }
               
              </select><br />
              <input type="file" placeholder="image" onChange={this.handelimage} /><br />
              <input type="file" placeholder="pdfdocument" onChange={this.handlepdf} /><br />
              <input type="submit" />
            </form>

          </Modal.Body>
        </Modal>
        <Modal show={this.state.showedit} onHide={this.handlecloseedit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Vendor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitedit}>
              <input type="text" placeholder="vendorname" onChange={this.handelvendorname} value={this.state.vendorname} /><br />
              <input type="text" placeholder="firstname" onChange={this.handlefirstname} value={this.state.firstname} /><br />
              <input type="text" placeholder="lastname" onChange={this.handlelastname} value={this.state.lastname} /><br />
              <input type="text" placeholder="address" onChange={this.handleaddress} value={this.state.address} /><br />
              <select onChange={this.handlecountry}>
              <option disabled >---selectoption---</option>
                {
                  this.props.country.map((u,i)=>{
                    return  <option value={u.id} key={i}>{u.name}</option>
                  })
                }
               
              </select><br />
              <input type="file" placeholder="image" onChange={this.handelimage} /><br />
              <input type="file" placeholder="pdfdocument" onChange={this.handlepdf} /><br />
              <input type="submit" />
            </form>

          </Modal.Body>
        </Modal>

        <Modal show={this.state.showpdf} onHide={this.handleclosepdf}>
          <Modal.Header closeButton>
            <Modal.Title>Pdf View</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Iframe url={this.state.singlepdfurl}
              width="450px"
              height="450px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative" />

          </Modal.Body>
        </Modal>
        <ToastContainer />
      </React.Fragment>

    );
  }
}
const mapStateToProps = state => ({
  vendors: state.vendors.vendor,
  singlevendor: state.vendors.singlevendor,
  country: state.vendors.country
})
export default connect(mapStateToProps, { fetchVendor, fetchSingleVendor, fetchSearchVendor,fetchCountries })(Vendortable);
