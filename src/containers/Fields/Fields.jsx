import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";
import { ItemsContainer } from "./Fields.styled";
import { fieldContext } from "../../context/fields";

const Fields = () => {
    const navigate = useNavigate();

    const fields = useContext(fieldContext);
    // const [fieldItems, setFieldItems] = useState(fields);
    // console.log("fields");
    // console.log(fields);
    
    return (
        <div>
            <ItemsContainer>
                {
                fields.length ?
                fields.map(({ title, description, id }) => (
                    <CardItem
                        title={title}
                        text={description}
                        imageSrc={require("../../icons/field.webp")}
                        btnText="View on map"
                        onClick={() => navigate(`/map/${id}`)}
                        id={id}
                        key={id}
                    />
                )) :
                <h2>No Items</h2>
                }
            </ItemsContainer>
        </div>
    );
};

export default Fields