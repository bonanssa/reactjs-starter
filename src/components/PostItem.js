import React, { PropTypes, Component } from 'react';
import moment from 'moment';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import AccessTime from 'material-ui/svg-icons/device/access-time';
import Save from 'material-ui/svg-icons/content/save';
import Create from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

const getStyles = () => {
  const styles = {
    paper: {
      height: 200,
      width: 900,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    },
  };
  return styles;
};


class PostItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      postText: '',
      postDate: moment().format('LLLL'),
      isEditing: true,
    }
  };

  handleClick = () => {
    this.setState({
      postDate: moment().format('LLLL'),
      isEditing: !this.state.isEditing,
    })
  };

  onChangePostText = (e) => {
    this.setState({ postText: e.target.value });
  };

  handleRemove = () => {
    this.props.onRemove(this.props.id);
  }

  render () {
    const {
      id,
      name,
    } = this.props;

    const styles = getStyles();
    const icon = this.state.isEditing ? <Save /> : <Create />;

    return (
      <div>
        <Paper style={styles.paper}>
          <div className="header">
            <div className="fields">
              <AccountCircle />
              {name}
            </div>
            <div className="fields">
              <AccessTime />
              {this.state.postDate}
            </div>
            <div className="fields">
              {id ? <IconButton onClick={this.handleRemove}> <Delete /> </IconButton> : null }
              <IconButton onClick={this.handleClick}>
                {icon}
              </IconButton>
            </div>
          </div>
          <div className="comment-part">
            <TextField
              hintText="Digite aqui seu comentário"
              value={this.state.postText}
              disabled={!this.state.isEditing}
              onChange={e => this.onChangePostText(e)}
              style={{ width: 800 }}
            />
            <br />
          </div>
        </Paper>
      </div>
    );
  }
}

PostItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  onRemove: PropTypes.func,
};

export default PostItem;
