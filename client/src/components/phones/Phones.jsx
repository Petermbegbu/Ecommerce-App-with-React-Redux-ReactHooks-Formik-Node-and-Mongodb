import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

import Layout from "../Layout/Layout";
import SideBar from "../sideBar/SideBar";
import DisplayProducts from "../displayProducts/DisplayProducts";
import {getPaginatedPhonesAction} from "../../redux/actionCreators/productCreators";
import "./Phones.css";


const Phones = ({paginatedPhones, totalPages, phoneSearchValue, getPaginatedPhonesAction}) => {
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const order = "desc";
    const sortBy = "updatedAt";
    const category = "phones";

    const nextPage = () => {
        setSkip(skip + limit);
        setPageNo(pageNo + 1);
    } 

    const previousPage = () => {
        setSkip(skip - limit);
        setPageNo(pageNo - 1);
    } 

    const actions = async () => {
        await getPaginatedPhonesAction(sortBy, order, limit, skip, phoneSearchValue)
    }

    useEffect(() => {
        actions();
    }, [skip, limit])


    const title = "Phone Shop";
    
    return (
        <Layout title={title} description="Search and find phones of your choice" className="container-fluid px-5">
            <div className="row my-5">
                <div className="col-md-3">
                    <SideBar pageName="Phones" limit={limit} skip={skip} category={category}/>
                </div>
                <div className="col-md-9">
                    <h2 className="text-center">All Phones</h2>
                    <DisplayProducts products={paginatedPhones} col="4"/>

                    <div className="d-flex justify-content-around">
                        {
                            skip === 0 ? null : 
                                <button onClick={previousPage} className="btn btn-info">Previous Page</button>
                        },

                        {
                            pageNo === totalPages ? null :
                                <button onClick={nextPage} className="btn btn-secondary">Next Page</button>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    const {phones} = state;

    return {
        paginatedPhones: phones.paginatedPhones,
        totalPages: phones.totalPages,
        phoneSearchValue: phones.phoneSearchValue
    }
}

export default connect(mapStateToProps, {getPaginatedPhonesAction})(Phones);

