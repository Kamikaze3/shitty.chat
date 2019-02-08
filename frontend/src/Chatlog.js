import React, { useReducer, forwardRef, useImperativeHandle } from 'react';

const reducer = (state, action) => {
	if(action.type === 'NEW_MESSAGE')
		return { ...state,  chatlog: [ ...state.chatlog, action.message ] };

	return state;
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
			chatlog.map( log => <div> log </div> )
		}
	</div>;
};

export default forwardRef(Chatlog);
