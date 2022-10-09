import mrviewer from '../mrviewer.png'
import '../components/LandingPage.css';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={mrviewer} alt="logo" />
            <p className="mt-4" style={{ "fontFamily": "fantasy" }}>Unlimited movies</p>
            <p>
              <code>Watch anywhere. Cancel anytime.</code>
            </p>
            <div class="row">
              <div class="col-sm-12 text-center">
                <Link to="/login">
                  <button class="btn btn-danger btn-md mx-4">Sign in</button>
                </Link>
                <Link to="/register">
                  <button class="btn btn-danger btn-md mx-4">Sign up</button>
                </Link>
              </div>
            </div>
          </header>
        </div>
      );
}

export default LandingPage