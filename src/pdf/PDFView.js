import React, { useEffect, useState } from 'react'
import { axiosInstance } from "../config/api";
import getLabelString from '../lang/getLabelString';
import { useSearchParams } from "react-router-dom";
import { jsPDF } from 'jspdf';
import { PdfDownload } from '../components/Button'
import autoTable from 'jspdf-autotable';
import Base64 from 'base-64';
import html2canvas from "html2canvas";
import $ from 'jquery';

export default function PDFView() {
  const [villageDetails, setVillageDetails] = useState();
  const [nimshaskiyEmp, setNimshaskiyEmp] = useState([]);
  const [politicalActivists, setPoliticalActivists] = useState([]);
  const [educatedPerson, setEducatedPerson] = useState([]);
  const [schoolStu, setSchoolStu] = useState([]);
  const [gpMember, setGPMember] = useState([]);
  const [formerArmyFam, setFormerArmyFam] = useState([]);
  const [shopkeeperMarchant, setShopkeeperMarchant] = useState([]);
  const [progressiveFarmer, setProgressiveFarmer] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [population, setPopulation] = useState("0");
  const [popMale, setPopMale] = useState("0");
  const [popFemale, setPopFemale] = useState("0");
  const [educated, setEducated] = useState("0");
  const [eduMale, setEduMale] = useState("0");
  const [eduFemale, setEduFemale] = useState("0");
  const ImgURL = "http://localhost:5000/village/image/";


  const handleDownloadPDF = () => {
    const doc = new jsPDF('l', 'pt');
    autoTable(doc, {
      theme: "grid",
      html: "#basic_details_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#various_government_employees_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#various_government_employees_id",
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#nimshaskiy_emp_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#nimshaskiy_emp_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#political_party_activists_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#political_party_activists_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#societies_activists_high_edu_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#societies_activists_high_edu_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#temple_statue_name_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#temple_statue_name_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#school_stu_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#school_stu_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#gp_member_sarpanch_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#gp_member_sarpanch_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#former_army_or_family_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#former_army_or_family_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#shopkeeper_marchant_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#shopkeeper_marchant_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#progressive_farmer_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#progressive_farmer_id"
    })
    autoTable(doc, {
      theme: "plain",
      styles: { fontSize: 13 },
      html: "#population_head"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#population_id"
    })
    autoTable(doc, {
      theme: "grid",
      headStyles: {
        minCellHeight: 5, fontSize: 9, halign: 'center', text: { minCellWidth: 'wrap' }, lineWidth: 0.02,
        textColor: [66, 60, 60],
        fillColor: [255, 255, 255]
      },
      html: "#village_images_id"
    })


    // Image
    // let village_sketch_img = ImgURL + villageDetails[0].village_sketch;
    // console.log(village_sketch_img)
    // // let imgData = 'data:image/jpeg;base64,' + Base64.encode(village_sketch_img);
    // // console.log(imgData);
    // // console.log({ ...villageDetails.village_sketch })
    // let img = new Image()
    // img.src(village_sketch_img)
    // let imgData =
    //   doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
    let v_img = document.getElementById('village_sketch_img')
    let sketchImg;
    html2canvas(v_img, {
      useCORS: true,
      onrendered: function (canvas) {
        sketchImg = canvas.toDataURL('image/jpeg')
        doc.addImage(sketchImg, 'JPEG', 10, 10)
        console.log("umag")
      }
    })




    doc.save(`${villageDetails[0].village_name + '_' + Date.now()}.pdf`)
  }
  // console.log(villageDetails[0].village_sketch)

  const secPdf = () => {
    console.log("download pdf")
    let v_img_path = document.getElementById('village_sketch_img')
    let sketchImg;
    // html2canvas($('#village_sketch_img'), {
    //   useCORS: true,
    //   onrendered: function (canvas) {
    //     sketchImg = canvas.toDataURL('image/png')
    //     let doc = new jsPDF()
    //     doc.addImage(sketchImg, 'JPEG', 10, 10)
    //     doc.save(`output.pdf`)
    //     console.log("image download...")
    //   }
    // })

    // const pdf = new jsPDF();
    // pdf.text(Base64.encode(`भाषा`), 10, 10)
    // // html2canvas(v_img_path).then(canvas => {
    // //   const sketchImg = canvas.toDataURL("image/png");
    // //   pdf.addImage(sketchImg, "JPEG", 10, 20);
    // //   const blob = pdf.output('blob');
    // //   var formData = new FormData();
    // //   formData.append('pdf', blob);
    // // });
    // const blob = pdf.output('blob');
    // var formData = new FormData();
    // formData.append('pdf', blob);
    // pdf.save(`output.pdf`);
  }
  const getVillageDetails = () => {
    axiosInstance.get(`village/${searchParams.get('vid')}`)
      .then((res) => {
        setVillageDetails(res.data[0]);
      });
  }
  const getNimshakiyEmp = () => {
    axiosInstance.get(`village/filter-data/nimshashkiy_emp&${searchParams.get('vid')}`)
      .then((res) => {
        const _data = res.data[0];
        const tempArr1 = [];
        for (let i = 0; i < _data.length; i++) {
          if (i % 2 === 0) {
            tempArr1.push(_data[i]);
          }
        }
        setNimshaskiyEmp(res.data[0]);
      })
  }
  const getPoliticalActivists = () => {
    axiosInstance.get(`village/filter-data/political_party_activists&${searchParams.get('vid')}`)
      .then((res) => {
        setPoliticalActivists(res.data[0]);
      })
  }
  const getEducatedPerson = () => {
    axiosInstance.get(`village/filter-data/societies_activists_high_edu&${searchParams.get('vid')}`)
      .then((res) => {
        setEducatedPerson(res.data[0]);
      })
  }
  const getSchoolStu = () => {
    axiosInstance.get(`village/filter-data/school_stu&${searchParams.get('vid')}`)
      .then((res) => {
        setSchoolStu(res.data[0]);
      })
  }
  const getGpMember = () => {
    axiosInstance.get(`village/filter-data/gp_member_sarpanch&${searchParams.get('vid')}`)
      .then((res) => {
        setGPMember(res.data[0]);
      })
  }
  const getFormerArmyFam = () => {
    axiosInstance.get(`village/filter-data/former_army_or_family&${searchParams.get('vid')}`)
      .then((res) => {
        setFormerArmyFam(res.data[0]);
      })
  }
  const getShopkeeperMarchant = () => {
    axiosInstance.get(`village/filter-data/shopkeeper_marchant&${searchParams.get('vid')}`)
      .then((res) => {
        setShopkeeperMarchant(res.data[0]);
      })
  }
  const getProgressiveFarmer = () => {
    axiosInstance.get(`village/filter-data/progressive_farmer&${searchParams.get('vid')}`)
      .then((res) => {
        setProgressiveFarmer(res.data[0]);
      })
  }

  // Population
  const getPopulation = async () => {
    axiosInstance.get(`/people/population/population&${searchParams.get('vid')}`)
      .then((res) => {
        setPopulation(res.data.COUNT[0].total_population);
      })
  };
  const getPopMale = async () => {
    axiosInstance.get(`/people/population/pop_male&${searchParams.get('vid')}`)
      .then((res) => {
        setPopMale(res.data.COUNT[0].male);
      })
  };
  const getPopFemale = async () => {
    axiosInstance.get(`/people/population/pop_female&${searchParams.get('vid')}`)
      .then((res) => {
        setPopFemale(res.data.COUNT[0].female);
      })
  };
  const getEducated = async () => {
    axiosInstance.get(`/people/population/educated&${searchParams.get('vid')}`)
      .then((res) => {
        setEducated(res.data.COUNT[0].total_educated);
      })
  };
  const getEduMale = async () => {
    axiosInstance.get(`/people/population/educated_male&${searchParams.get('vid')}`)
      .then((res) => {
        setEduMale(res.data.COUNT[0].edu_male);
      })
  };
  const getEduFemale = async () => {
    axiosInstance.get(`/people/population/educated_female&${searchParams.get('vid')}`)
      .then((res) => {
        setEduFemale(res.data.COUNT[0].edu_female);
      })
  };


  useEffect(() => {
    getVillageDetails();
    getNimshakiyEmp();
    getPoliticalActivists();
    getEducatedPerson();
    getSchoolStu();
    getGpMember();
    getFormerArmyFam();
    getShopkeeperMarchant();
    getProgressiveFarmer();
    getPopulation();
    getPopMale();
    getPopFemale();
    getEducated();
    getEduMale();
    getEduFemale();
  }, [])
  const trStyle = { border: 0, width: "100%" };
  const tdStyle = { border: 0, padding: 0 };


  return (
    <div id='pdf-view pt-5'>
      <PdfDownload onClick={secPdf} />
      <div>
        <table role='table' className='table table-bordered' id='basic_details_id'>
          {
            villageDetails?.map((i, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <strong>{getLabelString('village_name')}:</strong> {i.village_name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>{getLabelString('post')}:</strong> {i.post}
                  </td>
                  <td><strong>{getLabelString('pincode')}:</strong> {i.pincode}</td>
                </tr>
                <tr>
                  <td><strong>{getLabelString('talathi_name')}:</strong> {i.talathi_name}</td>
                  <td><strong>{getLabelString('grampaanchayat')}:</strong> {i.grampaanchayat}</td>
                </tr>
                <tr>
                  <td><strong>{getLabelString('jp_circle')}:</strong> {i.jp_circle}</td>
                  <td><strong>{getLabelString('prathmik_aarogya_kendra')}:</strong> {i.prathmik_aarogya_kendra}</td>
                </tr>
                <tr>
                  <td><strong>{getLabelString('ps_circle')}:</strong> {i.ps_circle}</td>
                  <td><strong>{getLabelString('mseb_office')}:</strong>{i.mseb_office}  </td>
                </tr>
                <tr>
                  <td colSpan={2}><strong>{getLabelString('patsantha_shakha')}:</strong> {i.patsantha_shakha}</td>
                </tr>
                <tr>
                  <td colSpan={2}><strong>{getLabelString('bank')}:</strong> {i.bank}</td>
                </tr>
                <tr>
                  <td colSpan={2}><strong>{getLabelString('gas_agency')}:</strong> {i.gas_agency}</td>
                </tr>
                <tr>
                  <td colSpan={2}><strong>{getLabelString('school')}:</strong> {i.school}</td>
                </tr>
              </tbody>
            ))
          }
        </table>
        <table id='various_government_employees_head'>
          <tbody>
            <tr>
              <td><h5>{getLabelString('various_government_employees')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='various_government_employees_id'>
          <thead>
            <tr>
              <th>{getLabelString('position')} </th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('position')} </th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          {
            villageDetails?.map((i, index) => (
              <tbody key={index}>
                <tr>
                  <td>{getLabelString('talathi')}</td>
                  <td>{i.talathi_name}</td>
                  <td>{i.talathi_mobile}</td>

                  <td>{getLabelString('aasha')}</td>
                  <td>{i.gramsevak_name}</td>
                  <td>{i.gramsevak_mobile}</td>
                </tr>
                <tr>
                  <td>{getLabelString('gramsevak')}</td>
                  <td>{i.agri_assistant_name}</td>
                  <td>{i.agri_assistant_mobile}</td>

                  <td>{getLabelString('police_patil')}</td>
                  <td>{i.police_patil_name}</td>
                  <td>{i.police_patil_mobile}</td>
                </tr>
                <tr>
                  <td>{getLabelString('agri_assistant_name')}</td>
                  <td>{i.agri_assistant_name}</td>
                  <td>{i.agri_assistant_mobile}</td>

                  <td>{getLabelString('tantamukti_chif_name')}</td>
                  <td>{i.tantamukti_chif_name}</td>
                  <td>{i.tantamukti_chif_mobile}</td>
                </tr>
                <tr>
                  <td>{getLabelString('electrician')}</td>
                  <td>{i.electrician_name}</td>
                  <td>{i.electrician_mobile}</td>

                  <td>{getLabelString('kotval')}</td>
                  <td>{i.kotval_name}</td>
                  <td>{i.kotval_mobile}</td>
                </tr>
                <tr>
                  <td>{getLabelString('gp_emp')}</td>
                  <td>{i.gp_emp_name}</td>
                  <td>{i.gp_emp_mobile}</td>

                  <td>{getLabelString('insurance_agent')}</td>
                  <td>{i.insurance_agent_name}</td>
                  <td>{i.insurance_agent_mobile}</td>
                </tr>
                <tr>
                  <td>{getLabelString('doctors')}</td>
                  <td>{i.doctors_name}</td>
                  <td>{i.doctors_mobile}</td>

                  <td>{getLabelString('ration_shopkeeper')}</td>
                  <td>{i.ration_shopkeeper_name}</td>
                  <td>{i.ration_shopkeeper_mobile}</td>
                </tr>
              </tbody>
            ))
          }
        </table>
        <table className='table' id='nimshaskiy_emp_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}> <h5>{getLabelString('nimshashkiy_emp')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='nimshaskiy_emp_id'>
          <thead>
            <tr>
              <th>{getLabelString('position')}  </th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('position')}  </th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              nimshaskiyEmp?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{i.nimshashkiy_position}</td>
                  <td>{i.p_name}</td>
                  <td>{i.mobile}</td>
                  <td>{nimshaskiyEmp[index + 1]?.nimshashkiy_position}</td>
                  <td>{nimshaskiyEmp[index + 1]?.p_name}</td>
                  <td>{nimshaskiyEmp[index + 1]?.mobile}</td>
                </tr>
              )
                : <React.Fragment key={index}></React.Fragment>
              )
            }
          </tbody>
        </table>
        <table id='political_party_activists_head'>
          <tbody>
            <tr>
              <td><h5>{getLabelString('political_party_activists')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='political_party_activists_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('party')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('party')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              politicalActivists?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{i.p_name}</td>
                  <td>{i.political_party_activists_party}</td>
                  <td>{i.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{politicalActivists[index + 1]?.p_name}</td>
                  <td>{politicalActivists[index + 1]?.political_party_activists_party}</td>
                  <td>{politicalActivists[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>
        <table id='societies_activists_high_edu_head'>
          <tbody>
            <tr>
              <td><h5>{getLabelString('societies_activists_high_edu')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='societies_activists_high_edu_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('education')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('education')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              educatedPerson?.map((p, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{p.p_name}</td>
                  <td>{p.societies_activists_high_edu_education}</td>
                  <td>{p.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{educatedPerson[index + 1]?.p_name}</td>
                  <td>{educatedPerson[index + 1]?.societies_activists_high_edu_education}</td>
                  <td className='col-1'>{educatedPerson[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>
        <table id='temple_statue_name_head'>
          <tbody>
            <tr>
              <td><h5>{getLabelString('temple_statue_name')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='temple_statue_name_id'>
          <tbody>
            {
              villageDetails?.map((i, index) => (
                i.temple_statue_name.split(",").map((t, index) => index % 2 === 0 ? (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{t}</td>
                    <td>{index + 2}</td>
                    <td>{i.temple_statue_name.split(",")[index + 1]}</td>
                  </tr>
                ) : <React.Fragment key={index}></React.Fragment>)
              ))
            }
          </tbody>
        </table>

        <table className='table' id='school_stu_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><h5>{getLabelString('school_stu')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='school_stu_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              schoolStu?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{i.p_name}</td>
                  <td>{i.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{schoolStu[index + 1]?.p_name}</td>
                  <td>{schoolStu[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>
        <table className='table' id='gp_member_sarpanch_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><h5>{getLabelString('gp_member_sarpanch')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='gp_member_sarpanch_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              gpMember?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{i.p_name}</td>
                  <td>{i.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{gpMember[index + 1]?.p_name}</td>
                  <td>{gpMember[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>
        <table className='table' id='former_army_or_family_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><h5>{getLabelString('former_army_or_family')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='former_army_or_family_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              formerArmyFam?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{i.p_name}</td>
                  <td>{i.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{formerArmyFam[index + 1]?.p_name}</td>
                  <td>{formerArmyFam[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>

        <table className='table' id='shopkeeper_marchant_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><h5>{getLabelString('shopkeeper_marchant')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='shopkeeper_marchant_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              shopkeeperMarchant?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{i.p_name}</td>
                  <td>{i.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{shopkeeperMarchant[index + 1]?.p_name}</td>
                  <td>{shopkeeperMarchant[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>
        <table className='table' id='progressive_farmer_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><h5>{getLabelString('progressive_farmer')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='progressive_farmer_id'>
          <thead>
            <tr>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
              <th>{getLabelString('sr_no')}</th>
              <th>{getLabelString('name')}</th>
              <th>{getLabelString('mobile')}</th>
            </tr>
          </thead>
          <tbody>
            {
              progressiveFarmer?.map((i, index) => index % 2 === 0 ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{i.p_name}</td>
                  <td>{i.mobile}</td>

                  <td>{index + 2}</td>
                  <td>{progressiveFarmer[index + 1]?.p_name}</td>
                  <td>{progressiveFarmer[index + 1]?.mobile}</td>
                </tr>
              ) : <React.Fragment key={index}></React.Fragment>)
            }
          </tbody>
        </table>
        <table className='table' id='population_head'>
          <tbody>
            <tr style={trStyle}>
              <td style={tdStyle}><h5>{getLabelString('population')}</h5></td>
            </tr>
          </tbody>
        </table>
        <table className='table table-bordered' id='population_id'>
          <tbody>
            <tr>
              <td>{getLabelString('total_population')}</td>
              <td>{population}</td>
              <td>{getLabelString('total_educated')}</td>
              <td>{educated}</td>
            </tr>
            <tr>
              <td>{getLabelString('male')}</td>
              <td>{popMale}</td>
              <td>{getLabelString('male')}</td>
              <td>{eduMale}</td>
            </tr>
            <tr>
              <td>{getLabelString('female')}</td>
              <td>{popFemale}</td>
              <td>{getLabelString('female')}</td>
              <td>{eduFemale}</td>
            </tr>
          </tbody>

        </table>

        <table className='table table-bordered' id='village_images_id'>
          <thead>
            <tr>
              <th className='col-8'>{getLabelString('village_sketch')}</th>
              <th className='col-4'>{getLabelString('roads_connecting_village')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='col-8'>
                {
                  villageDetails?.map((i, index) => (

                    i.village_sketch ?
                      <img src={ImgURL + i.village_sketch} id='village_sketch_img' target="view_village_image" key={index} alt="village_sketch" />
                      : <span>image not avilable</span>
                  ))
                }
              </td>
              <td className='col-4'>
                {
                  villageDetails?.map((i, index) => (
                    i.roads_connecting_village ?
                      <img src={ImgURL + i.roads_connecting_village} target="view_village_image" key={index} alt="img" id='road_connecting_village' /> : <span>image not avilable</span>
                  ))
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PdfDownload onClick={handleDownloadPDF} />

    </ div >
  )
}
