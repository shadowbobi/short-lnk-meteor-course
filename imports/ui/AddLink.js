import React from "react";
import {Meteor} from "meteor/meteor";
import Modal from "react-modal";

export default class AddLink extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            url: "",
            isOpen: false,
            error: ""
        }
    }
    onSubmit(e) {
        const { url } = this.state;


        e.preventDefault();

        Meteor.call('links.insert', url, (error, res) => {
            if (!error) {
                this.handleModalClose();
            } else {
                this.setState({error: error.reason});
            }
        });
    }

    onChange(e) {
        this.setState({
            url: e.target.value
        })
    }

    handleModalClose() {
        this.setState({
            isOpen: false,
            url: "",
            error: ""
        });
    }

    render() {
        return (
            <div>
                <button className={"button"} onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel={"Add link"}
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="box-view__box"
                    overlayClassName="box-view box-view--modal">
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} className={"box-view__form"}>
                        <input
                            type="text"
                            placeholder="URL"
                            ref={"url"}
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}/>
                        <button className={"button"}>Add Link</button>
                        <button type={"button"} className="button button--secondary" onClick={this.handleModalClose.bind(this)}>cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}