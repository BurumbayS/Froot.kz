import React, { Component } from 'react';
import '../Styles/Modal.css';

class Modal extends Component{
	checkRequestStatus(status) {
		if (status == "OK") {
			this.refs.number.value = "";
			this.refs.comment.value = "";
			this.refs.create_date.value = "";
			this.refs.supply_date.value = "";

			this.props.handleClose();
			this.props.handleUpdateData();
		} else {
			alert("Произошла небольшая ошибка. Попробуйте еще раз");
		}
	}

	addNewInvoice = async (event) => {

		let number = this.refs.number.value;
     	let comment = this.refs.comment.value;
		let create_date = this.refs.create_date.value;
		let supply_date = this.refs.supply_date.value;

      	if (event) {
        	fetch(`http://localhost:8000/invoices/add/`, {
          		method: "post",
          		body: JSON.stringify({
            		'number': number,
					'comment': comment,
            		'create_date': create_date,
					'supply_date': supply_date
          	}),
          	headers: {
            	'Content-Type': 'application/json'
          	},
        	}).then(res => res.json().then(
          		this.checkRequestStatus(res.statusText)
        	))
      }
	}

	render(){
		return(
            <div>
                <div className = "modal">
                    <h4>Create Invoice</h4>

                    <div class="form">
                        <div className = "parameter">
        					<p class="title">Number: </p>
        					<input type = "text" placeholder="Enter number" ref="number"></input>
        				</div>
                        <div className = "parameter">
        					<p class="title">Invoice date: </p>
        					<input type = "date" ref="create_date"></input>
        				</div>
                        <div className = "parameter">
        					<p class="title">Supply date: </p>
        					<input type = "date" ref="supply_date"></input>
        				</div>

                        <div class="comment">
                            <p class="title">Comment: </p>
                            <textarea ref="comment"></textarea>
                        </div>
                    </div>

                    <button class="saveButton" onClick = {this.addNewInvoice.bind(this)}>Save</button>

                </div>
            </div>
		)
	}
}

export default Modal;
