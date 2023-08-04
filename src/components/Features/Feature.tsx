 import '../Home/Home.css';

const Feature = () => {
    return (
        <div className="bg-color h-screen text-[#DDDDDD]">
        <h2 className="text-3xl font-bold mb-3 text-center">Features of Our App</h2>
      <p>
        Our app comes with a variety of features to make your note organization a breeze. Here are some key highlights:
      </p>
      <ul className="list-disc ml-6">
        <li>
          <strong>User Authentication:</strong> Securely sign up and log in to access your notes using Firebase authentication.
        </li>
        <li>
          <strong>Create, Edit, and Delete Notes:</strong> Easily create new notes, edit existing ones, and delete notes when needed.
        </li>
        <li>
          <strong>Note Categorization:</strong> Organize your notes into categories for better management and easy retrieval.
        </li>
        <li>
          <strong>Cloud Storage:</strong> Store your notes securely in Firebase Cloud Firestore for easy access across devices.
        </li>
        <li>
          <strong>Photo Attachments:</strong> Attach images or photos to your notes for enhanced content visualization.
        </li>
        {/* Add other features */}
      </ul>
        </div>
    );
};

export default Feature;