import React, { Component } from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

class Table extends Component {
  constructor(props) {
    super(props);

    const { keyField, columns, bordered, defaultSortDirection } = props;
    this.state = {
      keyField,
      columns,
      bordered,
      defaultSortDirection,
      data: [],
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   this.state = { columns: props.columns, data: props.data };
  // }
  // componentWillMount() {}

  componentDidMount() {
    // this.setState({ ...this.state, columns: this.props.columns });
  }

  componentWillReceiveProps(nextProps) {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate", prevProps, this.props);
    const { data } = this.props;
    if (prevProps.data.length !== data.length) {
      this.setState({ ...this.state, data });
    }
  }

  // componentWillUnmount() {}

  render() {
    // const { keyField, columns, bordered, defaultSortDirection, data } =
    //   this.state;
    return (
      <div>
        <BootstrapTable
          {...this.state}
          // keyField
          // data
          // columns
          // bordered
          // defaultSortDirection
          striped
          hover
          condensed
        />
      </div>
    );
  }
}

Table.defaultProps = {
  keyField: "_id",
  bordered: false,
  defaultSortDirection: "asc",
};

Table.propTypes = {
  keyField: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.object),
  bordered: PropTypes.bool,
  defaultSortDirection: PropTypes.string,
};

export default Table;
