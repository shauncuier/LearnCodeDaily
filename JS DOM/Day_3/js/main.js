document.getElementById("addProductBtn").addEventListener("click", function () {
    const productName = document.getElementById("productName").value;
    const productImage = document.getElementById("productImage").value;
    const productPrice = document.getElementById("productPrice").value;

    const productCard = document.getElementById("productList");

    const newProduct = document.createElement("div");
    newProduct.innerHTML = `

        <div class="card bg-base-100 w-[20%] shadow-sm">
                <figure>
                    <img src="${productImage}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">
                    ${productName}
                        <div class="badge badge-secondary">Name</div>
                    </h2>

                    <div class="card-actions justify-end">

                        <div class="badge badge-outline">Price: $${productPrice}</div>
                    </div>
                </div>
            </div>

    `;
    productCard.appendChild(newProduct);
});
