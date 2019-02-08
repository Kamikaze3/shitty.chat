import React from 'react';
import { withRouter  } from 'react-router-dom';

const Frontpage = ({ history }) => <div className="Frontpage">
	<h1> Shitty.chat </h1>
	<p> Have a shitty chat with a stranger </p>
	<button onClick={() => { history.push('/new-chat') }}> Start a chat now </button>
</div>;

export default withRouter(Frontpage);
