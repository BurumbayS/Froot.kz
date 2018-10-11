import React, { Component } from 'react';
import Modal from './Modal.js'
import '../Styles/App.css';

class App extends Component {
    constructor (props) {
        super(props)
	    this.state = {
            invoices: [],
			showModal: false,
            modalName: 'invisibleModal'
	    };
	}
    componentDidMount() {
        this.loadData();
    }

    loadData = async() => {

        fetch('http://localhost:8000/invoices/')
        .then(data => data.json())
        .then((data) => {
          this.setState({ invoices: data })
        });
    }

    renderInvoices() {
        let invoices = this.state.invoices;
        const invoiceItems = [];
        for (var i=0; i < invoices.length; i++) {
            invoiceItems.push(
                <tr class="row">
                 <td>{invoices[i].create_date}</td>
                 <td>{invoices[i].number}</td>
                 <td>{invoices[i].supply_date}</td>
                 <td>{invoices[i].comment}</td>
                </tr>
            );
        }
        return invoiceItems;
    }

    showModal() {
		this.setState({
  	      showModal : true
  		})

        setTimeout(() => {
            this.setState({
                modalName : 'visibleModal'
          })
        }, 100);
	}
    hideModal() {
		this.setState({
          modalName : 'invisibleModal'
  		})

        setTimeout(() => {
            this.setState({
                showModal : false
          })
      }, 300);
	}

    render() {
        return (
        <div>
            <div class = {!this.state.showModal ? 'hideModal' : this.state.modalName }>
                <div class="backdrop" onClick = {this.hideModal.bind(this)}></div>
                <Modal handleClose={this.hideModal.bind(this)}
                       handleUpdateData = {this.loadData.bind(this)}>
                </Modal>
            </div>

            <div class="main">

                <h4>Invoices</h4>

                <div class="container">
                    <h5>Actions</h5>
                    <button class="addNewButton" onClick = {this.showModal.bind(this)}>Add new</button>
                </div>

                <div class="container">
                    <h5>Invoices</h5>
                    <table class="invoices">
                       <tr class="titles">
                            <th>Create</th>
                            <th>№</th>
                            <th>Supply</th>
                            <th>Comment</th>
                       </tr>
                       {this.renderInvoices()}
                    </table>

                </div>

            </div>
        </div>
        );
     }
}

export default App;
