export default function Home() {
  return (
    <main style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>NearbyConnect 📍</h1>
      <p>Find local businesses near you</p>

      <input
        placeholder="Search barber, food, POS..."
        style={{
          padding: "10px",
          width: "100%",
          marginTop: "20px",
          border: "1px solid gray",
        }}
      />
      <h2 style={{ marginTop: "30px" }}>Categories</h2>
      <ul>
        <li>🍔 Food</li>
        <li>💈 Barber</li>
        <li>💳 POS</li>
        <li>🔧 Repair</li>
      </ul>
    </main>
  );
}
