import React from "react";
import { NavLink, useParams } from "react-router-dom";

function ProgramsDetails(props) {

    let {specialty} = useParams();

    
    if ({specialty}==="se"){
        
     return (
         <div>
             <h1>
                 SE WORKS
             </h1>
         </div>
     );
         
     }else if({specialty}==="cse"){


     }else if({specialty}==="re"){
         
     }
    return(
        <div className="program-details-container">
           <>
            
            <h1>{specialty}</h1>
            
            <h2>
                 Overview
             </h2>
             <h3>
                 What is Software Engineering?
             </h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis eum sequi non reiciendis. Omnis culpa nisi, repellendus dolorem expedita veniam? Suscipit molestias, provident culpa beatae error veniam doloribus vitae delectus commodi a. Minima ullam perspiciatis iusto amet. Repellat quis error expedita fugiat, minus, repellendus tempora aspernatur iure ex sequi voluptatem magni sunt quia nulla earum nesciunt molestias incidunt eius ullam illum. Ullam ut sapiente provident laboriosam accusamus porro tempore rerum obcaecati cum odio fuga, illum quia velit inventore officiis consectetur in iste. Saepe non delectus reprehenderit accusantium exercitationem eos eveniet, laudantium similique quam voluptatem illo, atque natus cumque quaerat assumenda.
            </p>
            <h3>
                Why Software Engineering?
            </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat accusantium sed eaque veritatis aliquam, molestiae eius similique? Labore veritatis laboriosam sit, unde, ab necessitatibus temporibus nostrum soluta, inventore natus illum? Alias nostrum perspiciatis, quo eos aspernatur distinctio aperiam suscipit a enim! Est unde veniam esse veritatis eligendi, natus facere libero fuga voluptatum consequatur labore similique quisquam, nostrum commodi sunt minima, tenetur autem asperiores cum ducimus ex temporibus nihil enim. Pariatur numquam deleniti cumque temporibus voluptas labore excepturi molestias, consectetur aperiam doloribus ipsum nemo itaque. Omnis est, recusandae numquam sed ipsam porro assumenda nobis dolorem earum eaque animi, nulla et deleniti?</p>
            </>
            <h3>
                How can Medtech help?
            </h3>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eveniet quia incidunt voluptatem consequuntur provident modi, nobis animi. Nostrum id nulla, harum corporis eaque consequuntur nesciunt velit sequi debitis similique nobis ipsa. Commodi ipsum sequi ea adipisci! Maxime odio in minima praesentium quam, quia, aut blanditiis laborum voluptatum aliquid, harum excepturi. Maiores architecto rerum pariatur ullam. Obcaecati omnis aut labore nemo quidem illum cumque voluptate exercitationem, alias id, fugit ipsa!
            </p>
            <h3>
                What are the jobs of a Software Engineer?
            </h3>
            
               <li>Lorem ipsum dolor sit amet.</li> 
               <li>Lorem ipsum dolor sit amet.</li> 
               <li>Lorem ipsum dolor sit amet.</li> 
               <li>Lorem ipsum dolor sit amet.</li> 
               <li>Lorem ipsum dolor sit amet.</li> 
               <li>etc</li> 

            <h4>
             For more, see our    
             <NavLink to="/curriculm" text="Currciculm">
               Currciculm
            </NavLink>
            </h4>
        </div>
    );
}

export default  ProgramsDetails;