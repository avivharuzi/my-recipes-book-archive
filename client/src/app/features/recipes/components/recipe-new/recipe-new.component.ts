import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
  styleUrls: ['./recipe-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeNewComponent {}
