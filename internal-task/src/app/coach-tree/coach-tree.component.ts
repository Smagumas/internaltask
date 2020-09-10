import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { FormDataService } from '../form/form.data.service';
import { Subscription } from 'rxjs';
import { FormModel } from '../form/form.model';

@Component({
  selector: 'app-coach-tree',
  templateUrl: './coach-tree.component.html',
  styleUrls: ['./coach-tree.component.less']
})
export class CoachTreeComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  @ViewChild('treeView', { static: false }) treeView: ElementRef;

  constructor(private formDataService: FormDataService) { }

  ngOnInit(): void {
    this.loadCoaches();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadCoaches(): void {
    const subscription = this.formDataService.getForms().subscribe((response) => {
      this.buildTree(response);
    });

    this.subscriptions.add(subscription);
  }


  buildTree(items: FormModel[]) {
      const roots = [];
      const children = {};
      let html = '';

      // find the top level nodes and hash the children based on parent
      for (let i = 0, len = items.length; i < len; ++i) {
          const item = items[i];
          const p = item.coachId;
          const target = !p ? roots : (children[p] || (children[p] = []));
          target.push({ value: item });
      }

      // function to recursively build the tree
      const findChildren = (parent) => {
        html += '<ul>';
        const htmlParent = `<li id="${parent.value.id}"> ${parent.value.fullName} ${parent.value.email}</li>`;
        html += htmlParent;
        if (children[parent.value.id]) {
            parent.children = children[parent.value.id];
            for (let i = 0, len = parent.children.length; i < len; ++i) {
              findChildren(parent.children[i]);
            }
          }
        html += '</ul>';
        html += '';

      };

      // enumerate through to handle the case where there are multiple roots
      for (let i = 0, len = roots.length; i < len; ++i) {
        findChildren(roots[i]);
      }

      this.treeView.nativeElement.innerHTML += html;
  }
}
