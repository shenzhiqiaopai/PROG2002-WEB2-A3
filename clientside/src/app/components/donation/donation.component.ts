import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  fundraiserId: number | null = null; // 用于存储筹款活动 ID

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 获取路由参数
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.fundraiserId = +idParam; // 转换为数字
      } else {
        console.error('Fundraiser ID is null'); // 或者其他处理
      }
    });
  }

  ngAfterViewInit(): void {
    let donationEl: any = document.getElementById('donationForm');
    donationEl.addEventListener('submit', (event: any) => {
      console.log('Form submitted'); // 确认表单提交事件被触发
      event.preventDefault();
  
      let amountEl: any = document.getElementById('amount');
      let giverEl: any = document.getElementById('giver');
  
      const amount = amountEl.value;
      const fundraiserId = this.fundraiserId; // 使用存储的筹款活动 ID
      const giver = giverEl.value;
  
      // 检查所有字段是否填写
      if (!amount || !fundraiserId || !giver) {
        alert('Please fill in all the required fields.');
        return;
      }
  
      // 获取当前日期和时间
      const date = new Date().toISOString();
  
      // 创建要发送到服务器的数据
      const formData = {
        amount: parseFloat(amount),
        fundraiserId: fundraiserId,
        giver: giver,
        date: date
      };
  
      console.log('Sending data:', formData); // 打印要发送的数据
  
      // 使用 fetch 发送数据到服务器
      fetch('http://localhost:3060/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // 处理响应数据
        alert('Donation submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting donation:', error);
        alert('Failed to submit donation. Please try again.');
      });
    });
  }
  
}
