import NoImage from "../../no-image.png";

import { MdEdit, MdDelete, MdVisibility } from "react-icons/md";

import formatToBrlCurrency from "../../utils/formatToBrlCurrency.js";

const CardProduct = ({ id, image, productName, productValue }) => {

    const handleImageError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = NoImage;
    };


    return (
        <div className="product-card" id={id}>
            <div className="image">
                <img
                    src={image || NoImage}
                    alt={productName}
                    onError={handleImageError}
                />
            </div>
            <div className="name">
                <span>{productName}</span>
            </div>
            <div className="infos">
                <div className="price">
                    <span className="value">{formatToBrlCurrency(productValue)}</span>
                </div>
                <div className="options">
                    <button className="option-btn view" title="Visualizar">
                        <MdVisibility size={18} />
                    </button>

                    <button className="option-btn edit" title="Editar">
                        <MdEdit size={18} />
                    </button>

                    <button className="option-btn delete" title="Excluir">
                        <MdDelete size={18} />
                    </button>
                </div>
            </div>
        </div>
    )

};

export default CardProduct;