import React, { Component } from 'react';

class Operations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], // to store the form data
      formData: {
        name: '',
        email: '',
      },
      isEditing: false,
      editIndex: null,
    };
  }
  componentDidMount(){
    console.log("componentDidMount : when component render first time")
  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };


  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email } = this.state.formData;
    const newData = { name, email };

    if (this.state.isEditing) {
      this.setState((prevState) => {
        const updatedData = [...prevState.data];
        updatedData[prevState.editIndex] = newData;
        return {
          data: updatedData,
          formData: {
            name: '',
            email: '',
          },
          isEditing: false,
          editIndex: null,
        };
      });
    } else {
      this.setState((prevState) => ({
        data: [...prevState.data, newData],
        formData: {
          name: '',
          email: '',
        },
      }));
    }
  };

  // handle data deletion
  handleDelete = (index) => {
    this.setState((prevState) => {
      const newData = [...prevState.data];
      newData.splice(index, 1);
      return { data: newData };
    });
  };

  // handle data editing
  handleEdit = (index) => {
    const { name, email } = this.state.data[index];
    this.setState({
      formData: {
        name,
        email,
      },
      isEditing: true,
      editIndex: index,
    });
  };
  componentDidUpdate(){
    console.log("component updated");
  }

  render() {
    const { name, email } = this.state.formData;
    const { data, isEditing } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button onClick={() => this.handleEdit(index)}>
                    Edit
                  </button>
                  <button onClick={() => this.handleDelete(index)}>
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Operations;