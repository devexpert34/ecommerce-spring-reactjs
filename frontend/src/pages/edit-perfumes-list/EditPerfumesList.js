import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import EditPerfumes from "./EditPerfumes";
import {fetchPerfumes} from "../../actions/perfume-actions";

class EditPerfumesList extends Component {
    componentDidMount() {
        this.props.fetchPerfumes();
    }

    render() {
        const {perfumes} = this.props.perfumes;
        const itemsPerPage = 24;
        const searchByData = [
            {label: 'Парфюмер', value: 'perfumer'},
            {label: 'Название парфюма', value: 'perfumeTitle'},
            {label: 'Страна производитель', value: 'country'},
            {label: 'Пол', value: 'perfumeGender'}
        ];

        return (
            <EditPerfumes
                data={perfumes}
                itemsPerPage={itemsPerPage}
                searchByData={searchByData}/>
        );
    }
}

EditPerfumesList.propTypes = {
    fetchPerfumes: PropTypes.func.isRequired,
    perfumes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    perfumes: state.perfume
});

export default connect(mapStateToProps, {fetchPerfumes})(EditPerfumesList);
