import React, { Component } from "react";
import PropTypes from "prop-types";
import Resizer from "react-image-file-resizer";

class LoadImage extends Component {
    constructor(props) {
        super(props);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.state = {
            image: ""
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.image !== prevProps.data.image) {
            try {
                this.setState({ image: this.props.data.image });
            } catch (err) {
                console.log(err);
            }
        }
    }

    fileChangedHandler(event) {
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (!fileInput) return;
        try {
            Resizer.imageFileResizer(
                event.target.files[0],
                280,
                280,
                "JPEG",
                100,
                0,
                (uri) => {
                    // console.log(uri);
                    this.setState({ image: uri });
                    if (this.props.onChange) {
                        this.props.onChange({
                            name: "image",
                            value: uri
                        });
                    }
                },
                "base64"
            );
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className=" cover-big media">
                <label htmlFor="photo">{this.props.title}</label>
                <img
                    id="photo"
                    className="form-control media-object img-thumbnail cover-big"
                    src={this.state.image}
                    alt={this.props.data.name}
                />
                <div className="mt-2">
                    <input
                        type="file"
                        accept="image/*"
                        multiple="false"
                        style={{ display: "none" }}
                        onChange={this.fileChangedHandler}
                        ref={(fileInput) => (this.fileInput = fileInput)}
                    />
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => this.fileInput.click()}
                        disabled={!this.props.canLoad}
                    >
                        Загрузить {this.props.title.toLowerCase()}
                    </button>
                </div>
            </div>
        );
    }
}

LoadImage.defaultProps = {
    canLoad: true,
    title: "Имидж"
};

LoadImage.propTypes = {
    title: PropTypes.string,
    canLoad: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default LoadImage;
