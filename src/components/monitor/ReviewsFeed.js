import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ReactStars from "react-rating-stars-component";

function ReviewsFeed() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setdata] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reply, setReply] = useState();
  const [reviewID, setReviewID] = useState("");

  const Appdata = async () => {
    try {
      let res = await api({
        url: "/appdata",
        method: "POST",
        responseType: "json",
      });
      if (res?.status === "SUCCESS") {
        if (res?.code === 200) {
          // console.log(res);
          setdata(res.data.appData);
          setReviews(res.data.reviews.data);
        }
      } else {
        if (res?.data?.code === 400) {
          alert(res?.data?.message);
        }
      }
    } catch (error) {
      if (error?.response?.status === 401) navigate("/");
    }
  };

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== undefined
    ) {
      Appdata();
    } else {
      navigate("/signin");
    }
  }, []);

  const formattedreviews = (number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  };

  const generateReply = async (item) => {
    setReply("");
    try {
      let res = await api({
        url: "/appdata/reply",
        method: "POST",
        responseType: "json",
        data: {
          userName: item.userName,
          review: item.text,
        },
      });
      if (res.status === "SUCCESS") {
        if (res.code === 200) {
          setReviewID(item.id);
          setReply(res.data.data);
        }
      } else {
        if (res?.code === 400) {
          alert(res?.message);
        }
      }
    } catch (error) {
      if (error?.response?.status === 401) navigate("/");
    }
  };

  return (
    <>
      <div>
        <div className="d-flex gap-3">
          <img
            src={data?.icon}
            alt="logo"
            style={{
              width: "50px",
              height: "50px",
              marginLeft: "50px",
              marginTop: "40px",
            }}
          />
          <div className="d-flex">
            <h3 className="text-center mt-5">{data?.title}</h3>
          </div>
        </div>
        <br />
        <h5>{data?.summary}</h5> <br />
        <h5>
          {data?.score?.toFixed(2)}&nbsp;
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="var(--color-five-stars)"
              d="M11.3944 3.8243C11.5738 3.86916 11.7308 3.95888 11.843
               4.09346C11.9551 4.25047 12 4.40748 12 4.58692C12 4.76636 
               11.9327 4.92336 11.7981 5.05794L9.42056 7.36822L9.98131 
               10.643C10.0037 10.8224 9.95888 11.0019 9.86916 11.1589C9.77944 
               11.3159 9.64486 11.4056 9.46542 11.4505C9.28598 11.4953 9.10654
                11.4729 8.94953 11.3832L6.01122 9.85794L3.0729 11.3832C2.89346
                 11.4729 2.73645 11.4953 2.55701 11.4505C2.37757 11.4056 2.22056
                  11.3159 2.13084 11.1589C2.04112 11.0019 1.99626 10.8224 2.04112
                   10.643L2.60187 7.36822L0.224299 5.05794C0.0897196 4.92336 0 4.76636
                    0 4.58692C0 4.40748 0.0448598 4.25047 0.157009 4.09346C0.269159
                     3.95888 0.426168 3.86916 0.628037 3.8243L3.9028 3.35327L5.36075
                      0.392523C5.45047 0.213084 5.56262 0.100935 5.74206 0.0336449C5.9215 -0.011215
                       6.07851 -0.011215 6.25794 0.0336449C6.43738 0.100935 6.57196 0.213084 6.66168
                       0.392523L8.11963 3.35327L11.3944 3.8243Z"
            ></path>
          </svg>
        </h5>
        <span>{formattedreviews(data?.ratings)}&nbsp;Reviews</span>
      </div>
      <hr />

      <div>
        {reviews?.map((item, index) => {
          return (
            <div className="d-flex flex-column p-4" key={index}>
              <div className="d-flex gap-3">
                <span>
                  <ReactStars
                    count={item?.score}
                    // onChange={ratingChanged}
                    size={24}
                    activeColor="gold"
                  />
                </span>
                <span>{item.userName}</span> &nbsp; &nbsp;{" "}
                <span>{item.date}</span>
              </div>
              <br />
              <p className="d-flex">{item.text}</p>
              <br />
              <button
                className="btn btn-primary w-25"
                onClick={() => {
                  generateReply(item);
                }}
              >
                Generate AI reply
              </button>
              <br />
              <textarea
                placeholder="Enter reply text"
                cols={70}
                rows={4}
                value={item?.id === reviewID ? reply : ""}
                onChange={(e) => setReply(e.target.value)}
              ></textarea>
              <br />
              <button className="btn btn-success w-25 mb-5">Send Reply</button>
            </div>
          );
        })}
      </div>
      {/* <Header /> */}
      {/* <h1>{data?.title}</h1>
      {data && (
        <div className="appdata">
          <img className="banner" src={data.headerImage} alt="banner" />
          <br />
          <h5>{data.summary}</h5>
          <Carousel data-bs-theme="dark">
            {data?.screenshots?.map((item) => (
              <Carousel.Item>
                <img className="d-block w-600" src={item} alt="First slide" />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="reviews">
            <div className="rating">
              <h5>
                {data.score?.toFixed(2)}&nbsp;
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="var(--color-five-stars)"
                    d="M11.3944 3.8243C11.5738 3.86916 11.7308 3.95888 11.843 4.09346C11.9551 4.25047 12 4.40748 12 4.58692C12 4.76636 11.9327 4.92336 11.7981 5.05794L9.42056 7.36822L9.98131 10.643C10.0037 10.8224 9.95888 11.0019 9.86916 11.1589C9.77944 11.3159 9.64486 11.4056 9.46542 11.4505C9.28598 11.4953 9.10654 11.4729 8.94953 11.3832L6.01122 9.85794L3.0729 11.3832C2.89346 11.4729 2.73645 11.4953 2.55701 11.4505C2.37757 11.4056 2.22056 11.3159 2.13084 11.1589C2.04112 11.0019 1.99626 10.8224 2.04112 10.643L2.60187 7.36822L0.224299 5.05794C0.0897196 4.92336 0 4.76636 0 4.58692C0 4.40748 0.0448598 4.25047 0.157009 4.09346C0.269159 3.95888 0.426168 3.86916 0.628037 3.8243L3.9028 3.35327L5.36075 0.392523C5.45047 0.213084 5.56262 0.100935 5.74206 0.0336449C5.9215 -0.011215 6.07851 -0.011215 6.25794 0.0336449C6.43738 0.100935 6.57196 0.213084 6.66168 0.392523L8.11963 3.35327L11.3944 3.8243Z"
                  ></path>
                </svg>
              </h5>
              <span>{formattedreviews(data.ratings)}&nbsp;Reviews</span>
            </div>
            |
            <div className="rating">
              <span>{formattedreviews(data.minInstalls)}+</span>Downloads
            </div>
            |
            <div className="rating">
              <span>{data?.contentRating}</span> ContentRating
            </div>{" "}
          </div>
          <br />
        </div>
      )} */}
    </>
  );
}

export default ReviewsFeed;
