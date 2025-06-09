import React, { useContext } from 'react'
import ProductsShared from '../../../shared/ProductsShared'
import MainPrimaryNavs from '../../../shared/MainPrimaryNavs'
import { ProductContext } from '../../../../context/ProductContext';


function MainEarphones() {

     const { products } = useContext(ProductContext);
    const targetData = products.filter(item => item.category === "earphones")
    const sortProducts = targetData.sort((itemA, itemB) => itemA.slug < itemB.slug)
   console.log(products)
   console.log(sortProducts)

    if (!products) return <p>Loading...</p>;

    return (
        <main className='main'>

            <div className='main-products-container'>                
                {/*Feature products*/}
                {sortProducts.map(product => <ProductsShared key={product.id}
                    desktop={product.categoryImage.desktop}
                    tablet={product.categoryImage.tablet}
                    mobile={product.categoryImage.mobile}
                    name={product.name}
                    description={product.description}
                    address={product.slug}
                />)}
            </div>

            <MainPrimaryNavs />

        </main>
    )
}

export default MainEarphones