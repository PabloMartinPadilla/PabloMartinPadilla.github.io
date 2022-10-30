/*Boostrap*/
(function () {
      var forms = document.querySelectorAll('.needs-validation')
      Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

/* Producto precargado*/
const cartURL = "https://japceibal.github.io/emercado-api/user_cart/" + 25801 + ".json";

const urlasync = async (url) => {
    const fetchProm = await fetch(url);
    if (fetchProm.ok) {
      fetchResp = await fetchProm.json();
      return fetchResp;
    } 
};


document.addEventListener("DOMContentLoaded", async () => {
  const cartPreloadedProds = await urlasync(cartURL);
  let {name, currency, unitCost, count, image } = cartPreloadedProds.articles[0];
  function getCartPreloadedProducts() {
    return `
    <div class="container tarjet rounded-3 p-4">
    <table class="table  text-center justify-content-between ">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Nombre</th>
          <th scope="col">Costo</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr id="items-body">
          <td><img src="${image}" class="img-fluid img rounded-3 img-thumbnail imgCarrito" ;"></td>
          <td class="pt-5">${name}</td>
          <td class="pt-5">${currency} ${unitCost}</td>
          <td class="pt-5">
          <input id="cantidad" class="form-control" type="number"  min="1" value="${count}" required></td>
          <td class="pt-5" id="costoTotal"> ${currency} ${unitCost * count} </td>
        </tr>
      </tbody>
    </table>
  </div>
`;

  }
  document.getElementById("escribir").innerHTML += getCartPreloadedProducts();

  /* Cuenta */
let cantidad = document.getElementById("cantidad");
  let Total = document.getElementById("costoTotal");
  cantidad.addEventListener("change", () => {
    if (cantidad.value > 1) {
      let currentTotal =
      cantidad.value * cartPreloadedProds.articles[0].unitCost;
      return (Total.innerHTML = currency + " " + currentTotal);
    } else{
        cantidad.value = 1;
        return (Total.innerHTML = currency + " " + unitCost);
    }
  });
})

