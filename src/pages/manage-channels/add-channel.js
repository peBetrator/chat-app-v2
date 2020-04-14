import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createRoom, searchRoom, getRooms } from '../../actions';

class AddChannelForm extends Component {
  state = { input: '', successMessage: '', error: '' };

  handleSubmit = async event => {
    const { input } = this.state;
    const { uid } = this.props;
    const isCreate = event.currentTarget.value === 'create';
    try {
      const actionResult = isCreate
        ? await createRoom(input, uid)
        : await searchRoom(input, uid);

      this.displaySuccessMessage(
        isCreate ? 'Room was created successfully!' : 'Room was found!'
      );
    } catch (error) {
      this.setState({ error: error.message });
    }

    this.sanitizeAfterSubmit();
  };

  sanitizeAfterSubmit = () => {
    const { uid, getRooms } = this.props;
    getRooms(uid);
    this.setState({ input: '' });
  };

  displaySuccessMessage = successMessage => {
    const { handleClose } = this.props;
    this.setState({ successMessage, error: '' }, () =>
      setTimeout(() => {
        this.setState({ successMessage: '' });
        handleClose();
      }, 2000)
    );
  };

  render() {
    const { input, successMessage, error } = this.state;

    return (
      <div>
        <div className="d-flex justify-content-center">
          <div>
            <input
              type="text"
              className={`form-control w-100 ${successMessage && 'is-valid'} ${error && 'is-invalid'}`}
              value={input}
              placeholder="Room title"
              onChange={e => this.setState({ input: e.target.value })}
            />
            {(successMessage || error) && (
              <div className={error ? 'invalid-feedback' : 'valid-feedback'}>
                {successMessage || error}
              </div>
            )}
          </div>
        </div>
        <div className="d-flex">
          <div className="mr-auto p-2">
            <button
              value="create"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Create
            </button>
          </div>
          <div className="p-2">
            <button
              value="search"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getRooms,
};

export default connect(null, mapDispatchToProps)(AddChannelForm);
