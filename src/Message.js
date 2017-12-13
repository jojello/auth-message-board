import React, { Component } from 'react'

class Message extends Component {
	constructor(props) {
		super(props)
		this.handleThumbsUp = this.handleThumbsUp.bind(this)
		this.handleThumbsDown = this.handleThumbsDown.bind(this)
		this.handleBin = this.handleBin.bind(this)
	}

	// function is called in the onClick event listener
	// on the 'thumbsup' icon
	// this function calls on the prop 'onLike' passed through in 'App'
	// to run the function handleLike using the ID of the post in this component
	// sent to the function as this.props.id - in this instance
	handleThumbsUp() {
		this.props.onLike(this.props.id)
	}

	handleThumbsDown() {
		this.props.onDislike(this.props.id)
	}

	handleBin() {
		this.props.onDeleteMessage(this.props.id)
	}

	render() {
		return (
			<li>
				{this.props.userEmail}: {this.props.text}
				{/* onCLick event listener triggers the corresponding function within this component's instance */}
				<i class="fa fa-trash pull-right delete" onClick={this.handleBin} />
				<i
					class="fa fa-thumbs-down pull-right"
					onClick={this.handleThumbsDown}
				/>
				<i class="fa fa-thumbs-up pull-right" onClick={this.handleThumbsUp} />
				<div class="pull-right">{this.props.likes}</div>
			</li>
		)
	}
}

export default Message
