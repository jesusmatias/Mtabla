import React, { Component } from "react";

class UsersSearch extends Component {
  render() {
    return (
      <div>
        <form>
          <label>Buscar: </label>
          <input
            type="search"
            id="search"
            name="search"
            onChange={this.onSearch}
            placeholder="Nombre, UserName , Email"
          />
        </form>
      </div>
    );
  }
}
export default UsersSearch;
