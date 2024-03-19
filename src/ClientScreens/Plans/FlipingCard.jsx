
import "./Plans.css";


const PlanCard = ({ plan }) => {
  return (
    <div className="flip-card" >
      <div className="flip-card-inner">
        <div className="flip-card-front" >
            
          <h2 className="cl-h2-plans">{plan.planName}</h2>
          <center><hr className="cl-hr-plans"/></center>
          <div className='cout'>
          <div className='cin'>        
          <p className="cl-p-plans"><strong>Min. Investment</strong><br/>{plan.minInvestmentAmount}</p>
          </div>
          <div className='cin'>
          <p className="cl-p-plans"><strong>Risk</strong><br/>{plan.risk}</p>
          </div>
          </div>
          <div>
          <img className="cl-moneyimg-plans" src="https://picsum.photos/600/300/" alt="money" style={{ borderRadius: '1.5rem', width: '10rem', height: '5rem', margin: '0.6rem' }} />
          </div>
          <footer className='ffo'>
            <div className='finr'>
          <p className="cl-p-stars-plans">⭐<br/>10/5</p>
          </div>
          <div className='finl'>
          <p className="cl-p-stars-plans">👥<br/>{plan.noOfSubscription}</p>
          </div>

          </footer>
        </div>
        <div className="flip-card-back" >
        {/* style={{marginTop:"0.5rem",fontWeight:"bold",fontSize:"1.5rem", marginBottom:"0rem"}} */}
          <h2>Dummy Text</h2>
          <center><hr className="cl-hr-plans"/></center>
          <br/>
          <p>This is the back side of the card.</p>
          <p>Add your dummy text here.</p>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
