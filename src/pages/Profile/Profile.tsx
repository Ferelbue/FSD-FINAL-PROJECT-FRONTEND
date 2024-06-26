
import { BringUserProducts, BringUserProfile, Notification, UploadImage, UploadUserProfile } from "../../services/apiCalls";
import { DataFetched2, DataReview, UserUpdateData, UserProfile, FileImageData, ProductData4 } from "../../interfaces";
import { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { useSelector, } from "react-redux";
import { userData, userout } from "../../app/slices/userSlice";
import { Card, Carousel } from "react-bootstrap";
import dayjs from "dayjs";
import { updateProductDetail } from "../../app/slices/productDetailSlice";
import { useDispatch } from "react-redux";
import { updateNotification } from "../../app/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { ROOT2 } from "../../services/apiCalls"
import { CInput3 } from "../../common/CInput3/CInput3";

export const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  const [userProducts, setUserProducts] = useState<ProductData4[]>([]);
  const [error, setError] = useState<string>("");
  const [uploadProductsClick, setUploadProductsClick] = useState<boolean>(false);
  const [myReviewsClick, setMyReviewsClick] = useState<boolean>(false);
  const [showNoFavorites, setShowNoFavorites] = useState(false);
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [write, setWrite] = useState<boolean>(true);
  const [adminApp, setAdminApp] = useState<boolean>(false);
  const rdxUser = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataImage, setDataImage] = useState<FileImageData>();
  const fileInput = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<UserUpdateData>({
    name: "",
    lastName: "",
    image: "",
    city: "",
  })

  const inputHandler2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState: UserUpdateData) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const notiMe = async (): Promise<void> => {
    try {
      const fetched2: DataFetched2 = await Notification(rdxUser.credentials.token);
      if (fetched2.message === "JWT NOT VALID OR MALFORMED") {
        dispatch(userout({ credentials: "" }));
        dispatch(updateNotification({ notification: "" }));
        navigate("/")
      }
      if (fetched2.data[0].length === 0 && fetched2.data[1].length === 0) {
        dispatch(updateNotification({ notification: false }))
      } else {
        dispatch(updateNotification({ notification: true }))
      }
      setError(fetched2.message);
    } catch (error) {
      console.log(error, "error")
    }
  }

  useEffect(() => {
    if (rdxUser.credentials === "") {
      navigate("/home");
    }

  }, [rdxUser]);

  useEffect(() => {
    if (!userProfile) {
      setTimeout(() => {
        setShowNoFavorites(true);
      }, 1500);

    }
  }, [userProfile]);

  useEffect(() => {
    const bringData = async () => {
      const fetched: DataFetched2 = await BringUserProfile(rdxUser.credentials.token);
      const fetched2: DataFetched2 = await BringUserProducts(rdxUser.credentials.token);
      setUserProfile(fetched.data[0]);
      setUserProducts(fetched2.data);

      setUser({
        name: fetched.data[0].name,
        lastName: fetched.data[0].lastName,
        image: fetched.data[0].image,
        city: fetched.data[0].city,
      });

      notiMe();

      if (error) {
        console.log(error, "error");
      }
    };
    bringData();

  }, []);

  const handleDetail = (productId: number, ownerId: number) => {
    dispatch(updateProductDetail({ productDetail: { productId: productId, userUserId: ownerId } }));
    navigate("/productDetail")
  }

  const handleUploadProducts = () => {
    setUploadProductsClick(true);
    setMyReviewsClick(false);
    setAdminApp(false);
  }
  const handleMyReviews = () => {
    setMyReviewsClick(true);
    setUploadProductsClick(false);
    setAdminApp(false)
  }

  const handleAdmin = () => {
    setAdminApp(true)
    setUploadProductsClick(false);
    setMyReviewsClick(false);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = fileInput?.current?.files?.[0]
    const formData = new FormData()
    if (file) {
      const date = new Date()
      const timestamp = date.getTime();
      const newFileName = `${timestamp}-${file.name}`
      formData.append('image', file, newFileName);
    } else {
      console.error('No file selected');
    }
    const fetched: DataFetched2 = await UploadImage(formData, rdxUser.credentials.token)
    console.log(fetched, "fetched")

    setDataImage(fetched.data);
    setUser(prevUser => ({ ...prevUser, image: fetched.data.originalname }))

  };

  const carouselSize = 4
  const arrayProducts = []
  let totalStars = 0
  if (userProfile && userProducts) {
    for (let i = 0; i < userProducts.length; i += carouselSize) {
      arrayProducts.push(userProducts.slice(i, i + carouselSize))
    }
    userProducts.forEach((product: ProductData4) => {
      totalStars += product.starts
    });
  }

  let averageStars = Math.ceil(totalStars / arrayProducts.length);
  const handleEdit = async () => {
    setEditProfile(true)
    setWrite(false)
  }
  const handleSend = async () => {
    const fetched: DataFetched2 = await UploadUserProfile(user, rdxUser.credentials.token);
    setEditProfile(false)
    setWrite(true)
    console.log(fetched, "fetched")
  }

  return (
    <div className="profile">

      <>
        <div className="categoryTitle31">
          <div>
            MI PERFIL
          </div>
          <div className="iconsProfile">
            <div className="imageCloud" title="Mis productos subidos" onClick={() => handleUploadProducts()} />
            <div className="imageReviews" title="Mis reseñas" onClick={() => handleMyReviews()} />
            {rdxUser.credentials && rdxUser.credentials.user.roleName !== "user"
              ? <div className="imageSettings" title="Administración APP" onClick={() => handleAdmin()} />
              : null
            }
          </div>
        </div>
        <>
          {userProfile ? (
            <Card className="cardProduct33">
              <div className="imageGroupProfile" >
                {dataImage
                  ? <Card.Img className="imageUserProfile" src={`${ROOT2}${dataImage.destination}${dataImage.originalname}`} />
                  : <Card.Img className="imageUserProfile" src={`${ROOT2}uploads/${user.image}`} />
                }
                <div className="textProfile">TOTAL PRESTADOS ({userProfile.reviews.length})</div>
                <div className="textProfile">TOTAL SUBIDOS ({userProducts ? userProducts.length : 0})</div>
              </div>
              <div className="imageGroupProfile2" >
                <div className="editIcon">
                  {editProfile
                    ?
                    <>
                      <div className="imageTick" title="Aceptar cambios" onClick={() => handleSend()} />
                      <form onSubmit={handleSubmit}>
                        <input type="file" ref={fileInput} onChange={handleSubmit} id="fileInput" style={{ width: 0.1, height: 0.1, opacity: 0, overflow: 'hidden', position: 'absolute', zIndex: -1 }} />
                        <label htmlFor="fileInput" className="imageImage"></label>
                      </form>
                    </>
                    : null}
                  <div className="imagePencil" title="Editar perfil" onClick={() => handleEdit()} />

                </div>
                <div className="nameProfile">
                  <CInput3
                    className={editProfile ? "inputProfile1" : "inputProfile2"}
                    type="text"
                    name="name"
                    placeholder="Name"
                    disabled={write}
                    value={user.name || ""}
                    onChange={(e) => inputHandler2(e)}
                  />
                </div>
                <div className="nameProfile">
                  <CInput3
                    className={editProfile ? "inputProfile1" : "inputProfile2"}
                    type="text"
                    name="lastName"
                    placeholder="Name"
                    disabled={write}
                    value={user.lastName || ""}
                    onChange={(e) => inputHandler2(e)}
                  />
                </div>
                <div className="cityProfile">
                  <CInput3
                    className={editProfile ? "inputProfile1" : "inputProfile3"}
                    type="text"
                    name="city"
                    placeholder="Name"
                    disabled={write}
                    value={user.city || ""}
                    onChange={(e) => inputHandler2(e)}
                  />
                </div>
                <div className="starsProfile">
                  {averageStars === 0 ? <div className="productStart01"></div> : null}
                  {averageStars === 1 ? <div className="productStart11"></div> : null}
                  {averageStars === 2 ? <div className="productStart21"></div> : null}
                  {averageStars === 3 ? <div className="productStart31"></div> : null}
                  {averageStars === 4 ? <div className="productStart41"></div> : null}
                  {averageStars === 5 ? <div className="productStart51"></div> : null}
                  ({userProfile.reviews.length})
                </div>
              </div>
            </Card>

          ) :
            showNoFavorites
              ?
              (
                <div className="spinnerCenter2">Cargando profile....</div>
              )
              :
              (
                <div className="spinnerCenter2">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              )

          }
        </>

        <div>
          {uploadProductsClick && (
            <>
              <div className="categoryTitle35">
                MIS PRODUCTOS SUBIDOS ({userProducts && userProducts.length})
              </div>

              <Carousel>
                {arrayProducts && arrayProducts.map((products: ProductData4[], productIndex: number) => (
                  <Carousel.Item key={productIndex}>
                    <div className="row justify-content-around carouselProducts3">
                      {products.map((product: ProductData4) => (
                        <div className="col-sm-12 col-md-6 col-lg-3" key={product.id}>
                          <Card className="cardProduct" onClick={() => handleDetail(product.id, product.owner.id)}>
                            <Card.Img className="imageProductCard" src={`${ROOT2}uploads/${product.image}`} />
                            <Card.Body>
                              <Card.Title className="cardTitle">{product.name.toUpperCase()}</Card.Title>
                              <div className="cardPrice">
                                {product.hourPrice}€/hora &nbsp;&nbsp; {product.dayPrice}€/día
                              </div>
                              <Card.Text>{product.description}</Card.Text>
                            </Card.Body>
                            <div className="startCard">
                              {product.starts === 0 ? <div className="productStart0"></div> : null}
                              {product.starts === 1 ? <div className="productStart1"></div> : null}
                              {product.starts === 2 ? <div className="productStart2"></div> : null}
                              {product.starts === 3 ? <div className="productStart3"></div> : null}
                              {product.starts === 4 ? <div className="productStart4"></div> : null}
                              {product.starts === 5 ? <div className="productStart5"></div> : null}
                              ({product.totalReviews})
                            </div>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          )}
        </div>


        <div>
          {myReviewsClick && (
            <>
              {userProfile?.reviews && (
                <>
                  <div className="categoryTitle35">
                    MIS RESEÑAS ({userProfile.reviews.length})
                  </div>
                  <Card className="cardMyReviews">
                    <div>
                      <div>
                        {[...userProfile.reviews].reverse().map((review: DataReview) => (
                          <div className="reviewCard2" key={review.id}>
                            <div className="oneComment">
                              <div className="reviewTitle2">{review.name} <div className="dateDetail">{dayjs(review.updated_at).format('YYYY-MM-DD')}</div></div>
                              <div className="reviewStart2">
                                {review.starts === 0 ? <div className="productStart0"></div> : null}
                                {review.starts === 1 ? <div className="productStart1"></div> : null}
                                {review.starts === 2 ? <div className="productStart2"></div> : null}
                                {review.starts === 3 ? <div className="productStart3"></div> : null}
                                {review.starts === 4 ? <div className="productStart4"></div> : null}
                                {review.starts === 5 ? <div className="productStart5"></div> : null}
                              </div>
                              <div className="reviewText2">{review.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </>
              )}

            </>
          )}
        </div>

        <div>
          {adminApp && (
            <>
              <div className="categoryTitle35">
                ADMINISTRACIÓN APP
              </div>
              <Card className="cardMyReviews">
                <div className="adminAppGroup">
                  <div className="imageUsers">
                    <div className="imageAdminUsers" title="Admin APP" onClick={() => navigate("/adminusers")} />
                  </div>
                  <div className="imageProducts">
                    <div className="imageAdminProducts" title="Admin APP" onClick={() => navigate("/adminproducts")} />
                  </div>
                  <div className="imageMessages">
                    <div className="imageAdminMessages" title="Admin APP" onClick={() => navigate("/adminmessages")} />
                  </div>
                </div>
              </Card>

            </>
          )}
        </div>


      </>

    </div >
  );
};
