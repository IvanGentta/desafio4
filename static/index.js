/* eslint-disable no-undef */
const serverSocket = io("http://localhost:8080");

const container = document.getElementById("container") ?? null;

const template = `
{{#if listExist}}
  <h4>Products:</h4>
  <div>
    <div>
      {{#each list}}
        <div>
          <div>
            <div>
              <h5>{{this.title}}</h5>
              <p>{{this.description}}</p>
            </div>
            <ul>
              <li>Item {{this.ref}}</li>
              <li>Price: $ {{this.price}}</li>
              <li>Stock: {{this.stock}}</li>
            </ul>
          </div>
        </div>
      {{/each}}
    </div>
  </div>
{{else}}
  <p>Sin Products...</p>
{{/if}}
`;

const compileTemplate = Handlebars.compile(template);

serverSocket.on("updateList", (data) => {
  console.log(data);
  if (container !== null) {
    container.innerHTML = compileTemplate({
      headerTitle: "Home | Products",
      mainTitle: "List of products in Real Time",
      list: data.list,
      showList: data.showList,
    });
  }
});
