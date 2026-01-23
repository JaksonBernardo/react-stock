import NoImage from "../../no-image.png";

import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";

import formatToBrlCurrency from "../../utils/formatToBrlCurrency.js";

const CardProduct = ({ id, image, productName, productValue }) => {

    const handleImageError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = NoImage;
    };


    return (
        <div className="product-card">
            <div className="options">
                <button className="option-btn view">
                    <MdVisibility size={18} />
                </button>
                <button className="option-btn edit">
                    <MdEdit size={18} />
                </button>
                <button className="option-btn delete">
                    <MdDelete size={18} />
                </button>
            </div>

            <div className="image">
                <img src={image || NoImage} onError={handleImageError} />
            </div>

            <div className="name">{productName}</div>

            <div className="infos">
                <div className="price">
                    <span className="value">
                        {formatToBrlCurrency(productValue)}
                    </span>
                </div>
            </div>
        </div>
    )

};

export default CardProduct;