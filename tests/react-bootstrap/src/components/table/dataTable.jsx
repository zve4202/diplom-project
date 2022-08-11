import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "rsuite";

const { Column, HeaderCell, Cell } = Table;
const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactHeaderCell = (props) => (
    <HeaderCell {...props} style={{ padding: 4 }} />
);

class DataTable extends Component {
    constructor(props) {
        super(props);
        const { loading, columns, sortType, sortColumn } = props;
        this.state = {
            loading,
            sortType,
            sortColumn,
            columns,
            data: []
        };

        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate", prevProps, this.props);
        const { data, loading } = this.props;
        if (
            prevProps.data.length !== data.length ||
            prevProps.loading !== loading
        ) {
            this.setState({ ...this.state, data, loading });
        }
    }
    async handleSortColumn(sortColumn, sortType) {
        this.setState({ ...this.state, loading: true });
        if (this.onSortColumn) {
            await this.onSortColumn(sortColumn, sortType);
        }
        this.setState({ ...this.state, loading: false, sortColumn, sortType });
    }

    render() {
        const { columns, loading, sortType, sortColumn, data } = this.state;
        const {
            height,
            hover,
            fillHeight,
            showHeader,
            autoHeight,
            bordered,
            compact
        } = this.props;
        const CustomCell = compact ? CompactCell : Cell;
        const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;
        return (
            // <div style={{ height: autoHeight ? "auto" : 400 }}>
            <Table
                loading={loading}
                height={height}
                hover={hover}
                showHeader={showHeader}
                autoHeight={autoHeight}
                fillHeight={fillHeight}
                bordered={bordered}
                cellBordered={bordered}
                headerHeight={compact ? 30 : 40}
                rowHeight={compact ? 30 : 46}
                sortType={sortType}
                sortColumn={sortColumn}
                onSortColumn={this.handleSortColumn}
                data={data}
            >
                {columns.map((column) => {
                    const { key, label, ...rest } = column;
                    return (
                        <Column {...rest} key={key}>
                            <CustomHeaderCell>{label}</CustomHeaderCell>
                            <CustomCell dataKey={key} />
                        </Column>
                    );
                })}
            </Table>
            // </div>
        );
    }
}

DataTable.defaultProps = {
    keyField: "_id",
    // height: 900,
    autoHeight: true,
    // fillHeight: true,
    showHeader: true,
    bordered: false,
    compact: false,
    sortColumn: "name",
    sortType: "asc"
};

DataTable.propTypes = {
    keyField: PropTypes.string,
    height: PropTypes.number,
    loading: PropTypes.bool,
    hover: PropTypes.bool,
    autoHeight: PropTypes.bool,
    fillHeight: PropTypes.bool,
    showHeader: PropTypes.bool,
    bordered: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(PropTypes.object),
    sortColumn: PropTypes.string,
    sortType: PropTypes.string,
    onSortColumn: PropTypes.func
};

export default DataTable;
