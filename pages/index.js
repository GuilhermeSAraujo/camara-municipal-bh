import db from "../lib/mongodb";

export default function Home({ data }) {
  function getItemColor(status) {
    if (status === "Rejeitada") return "red";
    if (status === "Retirada") return "#eab676";
    if (status === "Lei") return "green";
  }

  return (
    <div>
      <h1>Dados do MongoDB</h1>
      <p>Nós temos {data.length} projetos de lei registrados no nosso banco de dados!</p>
      <ul>
        {data.map((item) => (
          <div key={item._id} style={{ display: "flex" }}>
            <li style={{ marginRight: "24px" }}>{item.title}</li>
            <li style={{ marginRight: "24px", color: getItemColor(item.status) }}>{item.status}</li>
            <li style={{ marginRight: "24px" }}>{item.author}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const data = await db.collection("projetosDeLei").find({}).toArray();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 10,
  };
}
