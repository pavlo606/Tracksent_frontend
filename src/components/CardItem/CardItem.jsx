import React from "react";
import { Card } from "antd";
import { Footer, CatdItemWrapper } from "./CardItem.styled";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";

const MAX_TEXT_LEN = 200;

const { Meta } = Card;

const CardItem = ({ title = 'Field', text = '', btnText = 'Show more', imageSrc, id, onClick }) => {
    const navigate = useNavigate();
    
    return (
        <CatdItemWrapper>
            <Card
                hoverable
                style={{ width: 350, borderRadius: "20px" }}
                cover={
                    <img style={{ borderRadius: "20px" }} alt="example" src={imageSrc} />
                }
            >
                <Meta title={title} description={text.length > MAX_TEXT_LEN ? `${text.substring(0, MAX_TEXT_LEN)}...` : text} />
                <Footer>
                    <PrimaryButton onClick={onClick}>{ btnText }</PrimaryButton>
                </Footer>
            </Card>
        </CatdItemWrapper>
    );
};

export default CardItem;