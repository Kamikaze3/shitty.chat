import React, { useReducer, forwardRef, useImperativeHandle } from 'react';

const reducer = (state, action) => {
	if(action.type === 'NEW_MESSAGE')
		return { ...state,  chatlog: [ ...state.chatlog, action.message ] };

	return state;
}

const Message = ({ log }) => {
	if(typeof log.image !== 'undefined')
		return <img src={log.image} />;

	return <div>{ JSON.stringify(log) }</div>;
}

const Chatlog = ({}, ref) => {
	const [{ chatlog }, dispatch] = useReducer(reducer, { chatlog: [] });

	useImperativeHandle(ref, () => ({
		newMessage(message) {
			dispatch({ type: 'NEW_MESSAGE', message });
		}
	}));

	return <div>
		{
			chatlog.lenght === 0 ? 'No chatlog' : ''
		}
		{
			chatlog.map( log => <Message log={log} /> )
		}
	</div>;
};

export default forwardRef(Chatlog);
