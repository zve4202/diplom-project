import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PaginationWrapper from "../pagination/paginationWrapper";
import { updateSetting } from "../../../store/setting";
import { debounce } from "lodash";

class Table extends Component {
    constructor(props) {
        super(props);

        // this.state = { inputs: null };
        this.name = this.props.name;
        this.config = this.props.config[this.name];
        this.inputs = null;
        this.focused = null;

        this.setInputs.bind(this);
        this.handleKeyDown.bind(this);
        this.handleFocus.bind(this);
    }

    setInputs() {
        this.inputs = Array.prototype.slice.call(
            document.querySelectorAll("input.table-input")
        );
    }

    componentDidMount() {
        this.setInputs();
        // const { inputs } = this;

        // if (inputs && inputs.length > 0) {
        //     inputs[0].focus();
        //     inputs[0].select();
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.data.length !== prevProps.data.length ||
            this.props.loading !== prevProps.loading
        ) {
            this.setInputs();
            if (!this.props.loading) {
                const { inputs } = this;
                if (inputs && inputs.length > 0) {
                    inputs[0].focus();
                    inputs[0].select();
                } else window.scrollTo(0, 0);
            }
        }
    }

    handleKeyDown(event, self) {
        const { inputs, focused } = self;
        if (!inputs || inputs.length === 0) return;
        // console.log(event.keyCode);
        if ([9, 13, 40].includes(event.keyCode)) {
            event.preventDefault();
            const index = (inputs.indexOf(focused) + 1) % inputs.length;
            const input = inputs[index];
            input.focus();
            input.select();
        }
        if ([38].includes(event.keyCode)) {
            event.preventDefault();
            const index = (inputs.indexOf(focused) - 1) % inputs.length;
            // console.log(index);
            const input = inputs[index >= 0 ? index : inputs.length - 1];
            input.focus();
            input.select();
        }
    }

    handleFocus(event, self) {
        self.focused = event.target;
        // console.log("handleFocus", event, self);
    }

    render() {
        const {
            name,
            onReload,
            columns,
            data,
            totalDocs,
            loading,
            headered,
            bordered,
            striped
        } = this.props;

        const onPageChangeDebounced = debounce(onReload, 250);
        const onPageChange = () => {
            onPageChangeDebounced();
        };

        return (
            <PaginationWrapper
                {...{ name, totalDocs, loading }}
                onChange={onPageChange}
            >
                <table
                    className={classNames({
                        "table table-hover": true,
                        "table-bordered": bordered,
                        "table-striped": striped
                    })}
                    onKeyDown={(e) => this.handleKeyDown(e, this)}
                    onFocus={(e) => this.handleFocus(e, this)}
                >
                    <TableHeader {...{ headered, name, onReload, columns }} />
                    <TableBody {...{ columns, data, loading }} />
                </table>
            </PaginationWrapper>
        );
    }
}

Table.defaultProps = {
    headered: true,
    bordered: false,
    striped: true,
    loading: false,
    totalDocs: 0
};

Table.propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.array,
    totalDocs: PropTypes.number,
    loading: PropTypes.bool,
    columns: PropTypes.array,
    headered: PropTypes.bool,
    bordered: PropTypes.bool,
    striped: PropTypes.bool,
    onReload: PropTypes.func,
    config: PropTypes.object,
    updateSetting: PropTypes.func
};

const mapStateToProps = (state) => ({
    config: state.setting.config
});

const mapDispatchToProps = {
    updateSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
