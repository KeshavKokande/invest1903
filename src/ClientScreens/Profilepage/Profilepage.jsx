import  { useState, useEffect } from 'react';
import axios from 'axios';
import GeneralInfoEditForm from './GeneralInfoEditForm';
import OtherInfoEditForm from './OtherInfoEditForm';
import './style.css';

const ProfilePage = () => {
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingOther, setIsEditingOther] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    img: "",
    name: "",
    location: "Pune",
    email: "",
    phone: "000000000",
    address: "adress abcdefghijk lmnopqrst",
    job: "S/W Developer",
    values: []
  });



  const [plansData, setPlansData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlansData = async () => {
      console.log("Started fetching plans data");
      try {
        const response = await fetch('http://localhost:8000/api/v1/Client/get-own-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch plans data');
        }

        const data = await response.json();
        setPlansData(data.client);
        console.log(data); // Log the data received from the API
        setIsLoading(false); // Set loading state to false after data is fetched

      } catch (error) {
        console.error('Error fetching plans data:', error.message);
      }
    };

    fetchPlansData();
  }, []);



  const handleGeneralEdit = () => {
    setIsEditingGeneral(true);
  };

  const handleOtherEdit = () => {
    setIsEditingOther(true);
  };

  const handleGeneralSave = (editedInfo) => {
    console.log("Edited general info:", editedInfo);
    // Call API to save edited general information
    axios.put('api/updateGeneralInfo', editedInfo)
      .then(response => {
        setProfileInfo(prevState => ({
          ...prevState,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          job: response.data.job
        }));
        setIsEditingGeneral(false);
      })
      .catch(error => {
        console.error('Error updating general information:', error);
      });
  };

  const handleOtherSave = (editedInfo) => {
    console.log("Edited other info:", editedInfo);
    // Call API to save edited other information
    axios.put('api/updateOtherInfo', editedInfo)
      .then(response => {
        setProfileInfo(prevState => ({
          ...prevState,
          values: response.data
        }));
        setIsEditingOther(false);
      })
      .catch(error => {
        console.error('Error updating other information:', error);
      });
  };

  return (
    <div className="profile-outer">
      <div className='one'>
        <div className="card oneone">
        <img
  src={profileInfo.img}
  alt="Placeholder Image"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = 'https://avatar.iran.liara.run/public/boy'; // Replace this URL with your actual placeholder image URL
  }}
  className="profile-image"
/>
          <h4>{plansData.name}</h4>
          <div className="card-body">
            <h4>{profileInfo.location}</h4>
          </div>
        </div>

        <div className="card twoone">
          <div className="card-header">
            General Information
            <span onClick={handleGeneralEdit} className="edit-icon">✎</span>
          </div>
          <div className="card-body">
            <p><strong>Email:</strong> {plansData.email}</p>
            <p><strong>Phone:</strong> {profileInfo.phone}</p>
            <p><strong>Address:</strong> {profileInfo.address}</p>
            <p><strong>Job Title:</strong> {profileInfo.job}</p>
          </div>
        </div>
      </div>
      <div className='two'>
        
        <div className="card twoone">
          <div className="card-header">
            Other Information
            <span onClick={handleOtherEdit} className="edit-icon">✎</span>
          </div>
          <div className="card-body">
            {profileInfo.values.map((attribute, index) => (
              <div key={index}>
                <h4>{attribute.name}</h4>
                <progress value={attribute.value} max={100} />
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isEditingGeneral && <GeneralInfoEditForm initialValues={profileInfo} onSave={handleGeneralSave} onCancel={() => setIsEditingGeneral(false)} />}
      {isEditingOther && <OtherInfoEditForm initialValues={profileInfo.values} onSave={handleOtherSave} onCancel={() => setIsEditingOther(false)} />}
    </div>
  );

  // return (
  //   <div><h1>this is profile page</h1></div>
  // );
};

export default ProfilePage;